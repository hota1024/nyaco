import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectLitStr } from '../common/literals'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenReceive: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenReceive')
  const broadcast = expectLitStr(c)
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenReceive({
      broadcast,
      body,
    }),
    span.merged(token.span)
  )
}
