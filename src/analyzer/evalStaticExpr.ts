import { Node } from '@/ast'
import { ScratchValue } from '@/ScratchValue'
import { AnalyzeContext } from './context'
import { AnalyzeError } from './error'

export const evalStaticExpr = (c: AnalyzeContext, expr: Node): ScratchValue => {
  return expr.kind.match({
    LitNum({ value }) {
      return value as ScratchValue
    },
    LitStr({ value }) {
      return value as ScratchValue
    },
    LitBool({ value }) {
      return value as ScratchValue
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _: () => {
      c.errors.push(new AnalyzeError(`not a static expression`, expr.span))
      return 0 as ScratchValue
    },
  })
}
