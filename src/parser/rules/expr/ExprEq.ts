import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprComp } from './ExprComp'
import { parseExprBin } from './parseExprBin'

export const parseExprEq: ParserRule = (c) => {
  return parseExprBin(c, parseExprComp, (c) =>
    c.peek().kind.match({
      EqEq: () => c.next() && Some(BinOpKind.EqEq()),
      NotEq: () => c.next() && Some(BinOpKind.NotEq()),
      _: () => None(),
    })
  )
}
