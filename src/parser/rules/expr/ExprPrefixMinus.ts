import { createNode, NodeKind, UniOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { parseAtom } from '../atom'

export const parseExprPrefixMinus: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    Minus: () => {
      const minusToken = c.next()
      const expr = parseAtom(c)

      return createNode(
        NodeKind.ExprUni({
          op: UniOpKind.Minus(),
          expr,
        }),
        minusToken.span.merged(expr.span)
      )
    },
    _: () => parseAtom(c),
  })
}
