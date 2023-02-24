import { createNode, Node, NodeKind } from '@/ast'
import { expectIdent } from '@/parser/ident'
import { ParserRule } from '@/parser/ParserRule'
import { expectTy } from '@/parser/ty/ty'
import { expectStmtListBlock } from '../stmts'

export const expectDefArg: ParserRule = (c) => {
  const name = expectIdent(c)
  c.expectNext('Colon')
  const ty = expectTy(c)

  return createNode(
    NodeKind.DefArg({ name, ty }),
    name.span.merged(c.current().span)
  )
}

export const expectItemDef: ParserRule = (c) => {
  const defToken = c.expectNext('KeywordDef')
  const args: Node[] = []
  let warp = false

  if (c.peek().kind.matches('KeywordWarp')) {
    c.expectNext('KeywordWarp')
    warp = true
  }

  const name = expectIdent(c)

  c.expectNext('OpenParen')
  while (!c.peek().kind.matches('CloseParen')) {
    const arg = expectDefArg(c)
    args.push(arg)

    if (c.peek().kind.matches('Comma')) {
      c.next()
    } else {
      break
    }
  }
  c.expectNext('CloseParen')

  const [body, bodySpan] = expectStmtListBlock(c)

  return createNode(
    NodeKind.ItemDef({ name, warp, args, body }),
    defToken.span.merged(bodySpan)
  )
}
