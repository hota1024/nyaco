import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprMul } from './ExprMul'
import { parseExprBin } from './parseExprBin'

export const parseExprAdd: ParserRule = (c) => {
  return parseExprBin(c, parseExprMul, (c) =>
    c.peek().kind.match({
      Plus: () => c.next() && Some(BinOpKind.Add()),
      Minus: () => c.next() && Some(BinOpKind.Minus()),
      _: () => None(),
    })
  )
}
