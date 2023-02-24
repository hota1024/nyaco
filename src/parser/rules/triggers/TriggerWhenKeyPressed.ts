import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectLitStr } from '../common/literals'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenKeyPressed: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenKeyPressed')
  const key = expectLitStr(c)
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenKeyPressed({
      key,
      body,
    }),
    span.merged(token.span)
  )
}
