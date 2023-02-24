import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenClicked: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenClicked')
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenClicked({
      body,
    }),
    span.merged(token.span)
  )
}
