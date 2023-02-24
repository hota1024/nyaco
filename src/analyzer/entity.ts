import { Node } from '@/ast'
import { Entity } from '@/scope/Entity'
import { Ty } from '@/ty'
import { AnalyzeContext } from './context'
import { AnalyzeError } from './error'

export const analyzeEntity = (
  c: AnalyzeContext,
  node: Node,
  entity: Entity
): Ty => {
  return entity.kind.match({
    Var() {
      return Ty.Any()
    },
    List() {
      return Ty.Any()
    },
    ScratchVar(value) {
      return value.ty
    },
    ProcParam(value) {
      const token = node.kind.expect('Ident').token
      token.meta = {
        ...token.meta,
        legendTokenType: 'parameter',
      }
      return value.ty
    },
    _() {
      c.errors.push(
        new AnalyzeError(`${entity.name} is not a variable or list`, node.span)
      )
      return Ty.Never()
    },
  })
}
