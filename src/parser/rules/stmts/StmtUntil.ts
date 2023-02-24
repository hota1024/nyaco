import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '.'
import { parseExpr } from '../expr'

export const expectStmtUntil: ParserRule = (c) => {
  const untilToken = c.expectNext('KeywordUntil')
  const condition = parseExpr(c)
  const [body, bodySpan] = expectStmtListBlock(c)
  const span = bodySpan.merged(untilToken.span)

  return createNode(
    NodeKind.StmtUntil({
      condition,
      body,
    }),
    span
  )
}
