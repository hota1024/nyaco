import { createNode, NodeKind } from '@/ast'
import { expectIdent } from '@/parser/ident'
import { ParserRule } from '@/parser/ParserRule'
import { expectTy } from '@/parser/ty/ty'
import { parseExpr } from '../expr'

export const expectLet: ParserRule = (c) => {
  const letToken = c.expectNext('KeywordLet')
  const name = expectIdent(c)
  c.expectNext('Colon')
  const ty = expectTy(c)
  c.expectNext('Eq')
  const init = parseExpr(c)

  return createNode(
    NodeKind.Let({
      name,
      ty,
      init,
    }),
    letToken.span.merged(init.span)
  )
}
