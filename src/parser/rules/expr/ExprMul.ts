import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprNot } from './ExprNot'
import { parseExprBin } from './parseExprBin'

export const parseExprMul: ParserRule = (c) => {
  return parseExprBin(c, parseExprNot, (c) =>
    c.peek().kind.match({
      Star: () => c.next() && Some(BinOpKind.Mul()),
      Slash: () => c.next() && Some(BinOpKind.Div()),
      Percent: () => c.next() && Some(BinOpKind.Mod()),
      _: () => None(),
    })
  )
}
