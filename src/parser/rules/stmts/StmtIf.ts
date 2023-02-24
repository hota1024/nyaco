import { createNode, NodeKind } from '@/ast'
import { ParseError } from '@/parser/error'
import { ParserRule } from '@/parser/ParserRule'
import { expectStmtListBlock } from '.'
import { parseExpr } from '../expr'

export const expectStmtIf: ParserRule = (c) => {
  const ifToken = c.expectNext('KeywordIf')
  const condition = parseExpr(c)
  const [body, bodySpan] = expectStmtListBlock(c)
  let span = bodySpan.merged(ifToken.span)
  let elseBody = undefined

  if (c.peek().kind.matches('KeywordElse')) {
    c.next()

    c.peek().kind.match({
      KeywordIf() {
        elseBody = expectStmtIf(c)
        span = span.merged(elseBody.span)
      },
      OpenBrace() {
        const [parsedElseBody, elseSpan] = expectStmtListBlock(c)

        elseBody = parsedElseBody
        span = span.merged(elseSpan)
      },
      _() {
        throw new ParseError(`expected if or block`, c.peek().span)
      },
    })
  }

  return createNode(
    NodeKind.StmtIf({
      condition,
      body,
      elseBody,
    }),
    span
  )
}
