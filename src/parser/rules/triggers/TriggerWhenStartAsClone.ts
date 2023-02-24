import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenStartAsClone: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenStartAsClone')
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenStartAsClone({
      body,
    }),
    span.merged(token.span)
  )
}
