import { BinOpKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { None, Some } from 'rs-enums'
import { parseExprAnd } from './ExprAnd'
import { parseExprBin } from './parseExprBin'

export const parseExprOr: ParserRule = (c) => {
  return parseExprBin(c, parseExprAnd, (c) =>
    c.peek().kind.match({
      BarBar: () => c.next() && Some(BinOpKind.Or()),
      _: () => None(),
    })
  )
}
