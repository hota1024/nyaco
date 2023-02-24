import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { expectLitStr } from '../common/literals'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenBackdropSwitches: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenBackdropSwitches')
  const backdrop = expectLitStr(c)
  const [body, span] = expectStmtListBlock(c)

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenBackdropSwitches({
      backdrop,
      body,
    }),
    span.merged(token.span)
  )
}
