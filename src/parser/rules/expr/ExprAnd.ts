import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprEq } from './ExprEq'
import { parseExprBin } from './parseExprBin'

export const parseExprAnd: ParserRule = (c) => {
  return parseExprBin(c, parseExprEq, (c) =>
    c.peek().kind.match({
      AndAnd: () => c.next() && Some(BinOpKind.AndAnd()),
      _: () => None(),
    })
  )
}
