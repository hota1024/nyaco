import { Ty } from '@/ty'
import { ParserContext } from '../context'
import { ParseError } from '../error'

export const expectTy = (c: ParserContext): Ty => {
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
    OpenBracket() {
      const ty = expectTy(c)
      c.expectNext('Star')
      const size = c.expectNext('LitNum').kind.takeVariantValue()
      c.expectNext('CloseBracket')

      return Ty.Array({ ty, size })
    },
    _() {
      throw new ParseError(`expected type`, c.current().span)
    },
  })
}
