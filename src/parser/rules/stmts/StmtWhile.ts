import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '.'
import { parseExpr } from '../expr'

export const expectStmtWhile: ParserRule = (c) => {
  const whileToken = c.expectNext('KeywordWhile')
  const condition = parseExpr(c)
  const [body, bodySpan] = expectStmtListBlock(c)
  const span = bodySpan.merged(whileToken.span)

  return createNode(
    NodeKind.StmtUntil({
      condition,
      body,
    }),
    span
  )
}
