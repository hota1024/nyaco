import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenFlagClicked: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenFlagClicked')
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenFlagClicked({
      body,
    }),
    span.merged(token.span)
  )
}
