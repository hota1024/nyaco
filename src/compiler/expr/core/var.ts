import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  varAddEntity,
  varHideEntity,
  varSetEntity,
  varShowEntity,
} from '@/scope/core/varScope'
import { Entity } from '@/scope/Entity'
import { NOM } from 'nyair'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'
import { getAndDataEntity } from '../entity'

export const tryVarCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  if (fn === varSetEntity) {
    return Some(
      createNom('data_setvariableto', {
        variable: getAndDataEntity(c, args[0]),
        value: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === varAddEntity) {
    return Some(
      createNom('data_changevariableby', {
        variable: getAndDataEntity(c, args[0]),
        value: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === varShowEntity) {
    return Some(
      createNom('data_showvariable', {
        variable: getAndDataEntity(c, args[0]),
      })
    )
  }

  if (fn === varHideEntity) {
    return Some(
      createNom('data_hidevariable', {
        variable: getAndDataEntity(c, args[0]),
      })
    )
  }

  return None()
}

// export const tryVarEntity = (
//   c: CompileContext,
//   entity: Entity
// ): Opt<NOM> => {
//   return None()
// }
