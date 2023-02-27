import { createNode, Node, NodeKind } from '@/ast'
import { TokenKind } from '@/tokens'
import { ParseError } from '../error'
import { expectIdent } from '../ident'
import { ParserListRule, ParserRule } from '../ParserRule'
import {
  expectLitBool,
  expectLitColor,
  expectLitList,
  expectLitNum,
  expectLitStr,
} from './common/literals'
import { parseExpr } from './expr'

export const expectArgList: ParserListRule = (c) => {
  const openToken = c.expectNext('OpenParen')
  const nodes: Node[] = []

  while (!c.peek().kind.matches('CloseParen')) {
    const node = parseExpr(c)
    nodes.push(node)

    if (!c.peek().kind.matches('Comma')) {
      break
    }
    c.next()
  }

  const closeToken = c.expectNext('CloseParen')

  return [nodes, openToken.span.merged(closeToken.span)]
}

export const parseAtom: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    LitNum: () => expectLitNum(c),
    LitStr: () => expectLitStr(c),
    LitBool: () => expectLitBool(c),
    LitColor: () => expectLitColor(c),
    Ident() {
      const ident = expectIdent(c)
      const segments = [ident]

      while (c.peek().kind.matches('ColonColon')) {
        c.next()
        if (c.peek().kind.matches('Star')) {
          c.next()
          segments.push(createNode(NodeKind.PathWild(), peek.span))
        } else {
          segments.push(expectIdent(c))
        }
      }

      const functionable =
        segments.length > 1
          ? createNode(NodeKind.Path(segments), peek.span)
          : ident

      c.identPathNodes.push(functionable)

      if (c.peek().kind.matches('OpenParen')) {
        const [args, span] = expectArgList(c)

        segments[segments.length - 1].kind.expect('Ident').token.meta = {
          legendTokenType: 'function',
        }

        const callNode = createNode(
          NodeKind.ExprCall({ fn: functionable, argsSpan: span, args }),
          span.merged(functionable.span)
        )
        c.callNodes.push(callNode)

        return callNode
      }

      return functionable
    },
    OpenParen: () => {
      c.next()
      const expr = parseExpr(c)
      c.expectNext('CloseParen')

      return expr
    },
    OpenBracket() {
      const list = expectLitList(c)

      return list
    },
    And() {
      const andToken = c.next()
      const entity = parseAtom(c)

      return createNode(
        NodeKind.AndEntity({ entity }),
        andToken.span.merged(entity.span)
      )
    },
    Star() {
      const starToken = c.next()
      const index = parseAtom(c)

      return createNode(
        NodeKind.Deref({ index }),
        starToken.span.merged(index.span)
      )
    },
    _: () => {
      const peek = c.peek()
      if (peek.kind.isKeyword()) {
        peek.kind = TokenKind.Ident()

        return parseAtom(c)
      }

      throw new ParseError(
        `expected expression but got \`${
          peek.literal
        }(${peek.kind.getVariant()})\``,
        peek.span
      )
    },
  })
}
