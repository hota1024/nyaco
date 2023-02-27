import { Ty } from '@/ty'
import { ParserContext } from '../context'
import { ParseError } from '../error'

export const expectTy = (c: ParserContext) => {
  return c.next().kind.match({
    TyAny() {
      return Ty.Any()
    },
    TyBool() {
      return Ty.Bool()
    },
    TyNum() {
      return Ty.Num()
    },
    TyStr() {
      return Ty.Str()
    },
    _() {
      throw new ParseError(`expected type`, c.current().span)
    },
  })
}
