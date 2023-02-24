import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '.'
import { parseExpr } from '../expr'

export const expectStmtRep: ParserRule = (c) => {
  const repToken = c.expectNext('KeywordRep')

  const count = parseExpr(c)
  const [body, span] = expectStmtListBlock(c)

  return createNode(
    NodeKind.StmtRep({ count, body }),
    span.merged(repToken.span)
  )
}
