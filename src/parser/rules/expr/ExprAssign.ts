import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprOr } from './ExprOr'
import { parseExprBin } from './parseExprBin'

export const parseExprAssign: ParserRule = (c) => {
  return parseExprBin(c, parseExprOr, (c) =>
    c.peek().kind.match({
      Eq: () => c.next() && Some(BinOpKind.Eq()),
      _: () => None(),
    })
  )
}
