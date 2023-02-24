import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprAdd } from './ExprAdd'
import { parseExprBin } from './parseExprBin'

export const parseExprComp: ParserRule = (c) => {
  return parseExprBin(c, parseExprAdd, (c) =>
    c.peek().kind.match({
      Lt: () => c.next() && Some(BinOpKind.Lt()),
      LtEq: () => c.next() && Some(BinOpKind.Lte()),
      Gt: () => c.next() && Some(BinOpKind.Gt()),
      GtEq: () => c.next() && Some(BinOpKind.Gte()),
      _: () => None(),
    })
  )
}
