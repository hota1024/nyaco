import { createNode, Node, NodeKind } from '@/ast'
import { ParserListRule, ParserRule } from '@/parser/ParserRule'
import { expectLet } from '../common/let'
import { parseExpr } from '../expr'
import { expectStmtForever } from './StmtForever'
import { expectStmtIf } from './StmtIf'
import { expectStmtRep } from './StmtRep'
import { expectStmtUntil } from './StmtUntil'
import { expectStmtWhile } from './StmtWhile'

export const parseStmt: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    KeywordRep: () => expectStmtRep(c),
    KeywordForever: () => expectStmtForever(c),
    KeywordIf: () => expectStmtIf(c),
    KeywordUntil: () => expectStmtUntil(c),
    KeywordWhile: () => expectStmtWhile(c),

    KeywordLet: () => expectLet(c),

    _: () => {
      const expr = parseExpr(c)
      let span = expr.span

      if (c.peek().kind.matches('Semi')) {
        span = c.expectNext('Semi').span
      } else if (!expr.kind.matches('ExprCall')) {
        span = c.expectNext('Semi').span
      }

      return createNode(NodeKind.StmtSemi({ expr }), expr.span.merged(span))
    },
  })
}

export const expectStmtListBlock: ParserListRule = (c) => {
  const openToken = c.expectNext('OpenBrace')

  const nodes: Node[] = []
  let span = openToken.span

  while (!c.peek().kind.matches('CloseBrace')) {
    const node = parseStmt(c)

    nodes.push(node)
    span = span.merged(node.span)
  }

  const closeToken = c.expectNext('CloseBrace')
  span = span.merged(closeToken.span)

  return [nodes, span]
}
