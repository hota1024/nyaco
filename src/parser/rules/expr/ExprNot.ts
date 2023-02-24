import { createNode, NodeKind, UniOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { parseExprPrefixMinus } from './ExprPrefixMinus'

export const parseExprNot: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    Not: () => {
      const minusToken = c.next()
      const expr = parseExprPrefixMinus(c)

      return createNode(
        NodeKind.ExprUni({
          op: UniOpKind.Not(),
          expr,
        }),
        minusToken.span.merged(expr.span)
      )
    },
    _: () => parseExprPrefixMinus(c),
  })
}
