import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '.'

export const expectStmtForever: ParserRule = (c) => {
  const foreverToken = c.expectNext('KeywordForever')
  const [body, bodySpan] = expectStmtListBlock(c)
  const span = bodySpan.merged(foreverToken.span)

  return createNode(
    NodeKind.StmtForever({
      body,
    }),
    span
  )
}
