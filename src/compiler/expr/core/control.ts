/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  controlCreateCloneEntity,
  controlCreateCloneOfEntity,
  controlDeleteThisCloneEntity,
  controlStopAllEntity,
  controlStopOtherScriptsInSpriteEntity,
  controlStopThisScriptEntity,
  controlWaitEntity,
} from '@/scope/core/controlScope'
import { Entity } from '@/scope/Entity'
import { NOM } from 'nyair'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryControlCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  if (fn === controlWaitEntity) {
    return Some(
      createNom('control_wait', {
        duration: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === controlStopAllEntity) {
    return Some(
      createNom('control_stop', {
        stopOption: 'all',
      })
    )
  }

  if (fn === controlStopThisScriptEntity) {
    return Some(
      createNom('control_stop', {
        stopOption: 'this script',
      })
    )
  }

  if (fn === controlStopOtherScriptsInSpriteEntity) {
    return Some(
      createNom('control_stop', {
        stopOption: 'other scripts in sprite',
      })
    )
  }

  if (fn === controlCreateCloneEntity) {
    return Some(
      createNom('control_create_clone_of', {
        cloneOption: createNom('$literal_string', {
          value: '_myself_',
        }) as NOM,
      })
    )
  }

  if (fn === controlCreateCloneOfEntity) {
    return Some(
      createNom('control_create_clone_of', {
        cloneOption: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === controlDeleteThisCloneEntity) {
    return Some(createNom('control_delete_this_clone', {}))
  }

  return None()
}

// export const tryControlEntity = (
//   c: CompileContext,
//   entity: Entity
// ): Opt<any> => {
//   return None()
// }
