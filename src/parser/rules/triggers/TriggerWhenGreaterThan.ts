import { createNode, NodeKind } from '@/ast'
import { CompileError } from '@/compiler/error'
import { ParserRule } from '@/parser/ParserRule'
import { expectLitStr } from '../common/literals'
import { parseExpr } from '../expr'
import { expectStmtListBlock } from '../stmts'

export const expectTriggerWhenGreaterThan: ParserRule = (c) => {
  const token = c.expectNext('KeywordWhenGreaterThan')
  const target = expectLitStr(c)
  const targetValue = target.kind.expect('LitStr').value
  const value = parseExpr(c)
  const [body, span] = expectStmtListBlock(c)

  if (targetValue !== 'loudness' && targetValue !== 'timer') {
    throw new CompileError(`expect "loudness" or "timer"`, target.span)
  }

  token.meta = {
    legendTokenType: 'event',
  }

  return createNode(
    NodeKind.TriggerWhenGreaterThan({
      target,
      value,
      body,
    }),
    span.merged(token.span)
  )
}
