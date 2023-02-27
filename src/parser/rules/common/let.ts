import { createNode, Node, NodeKind } from '@/ast'
import { expectIdent } from '@/parser/ident'
import { ParserRule } from '@/parser/ParserRule'
import { expectTy } from '@/parser/ty/ty'
import { parseExpr } from '../expr'

export const expectLet: ParserRule = (c) => {
  const letToken = c.expectNext('KeywordLet')
  const name = expectIdent(c)
  c.expectNext('Colon')
  const ty = expectTy(c)
  let init: Node | undefined

  if (c.peek().kind.matches('Eq')) {
    c.next()
    init = parseExpr(c)
  }

  const semiToken = c.expectNext('Semi')

  return createNode(
    NodeKind.Let({
      name,
      ty,
      init,
    }),
    letToken.span.merged(semiToken.span)
  )
}
