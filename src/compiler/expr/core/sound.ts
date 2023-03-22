import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  soundChangeEffectByEntity,
  soundChangeVolumeByEntity,
  soundClearEffectsEntity,
  soundPlayEntity,
  soundPlayUntilDoneEntity,
  soundSetEffectToEntity,
  soundSetVolumeToEntity,
  soundStopAllEntity,
  soundVolumeEntity,
} from '@/scope/core/soundScope'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const trySoundCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  if (fn === soundPlayUntilDoneEntity) {
    return Some(
      createNom('sound_playuntildone', {
        soundMenu: createNom('sound_sounds_menu', {
          soundMenu: args[0].kind.expect('LitStr').value,
        }),
      })
    )
  }

  if (fn === soundPlayEntity) {
    return Some(
      createNom('sound_play', {
        soundMenu: createNom('sound_sounds_menu', {
          soundMenu: args[0].kind.expect('LitStr').value,
        }),
      })
    )
  }

  if (fn === soundStopAllEntity) {
    return Some(createNom('sound_stopallsounds', {}))
  }

  if (fn === soundChangeEffectByEntity) {
    return Some(
      createNom('sound_changeeffectby', {
        effect: args[0].kind.expect('LitStr').value,
        value: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === soundSetEffectToEntity) {
    return Some(
      createNom('sound_seteffectto', {
        effect: args[0].kind.expect('LitStr').value,
        value: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === soundClearEffectsEntity) {
    return Some(createNom('sound_cleareffects', {}))
  }

  if (fn === soundChangeVolumeByEntity) {
    return Some(
      createNom('sound_changevolumeby', {
        volume: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === soundSetVolumeToEntity) {
    return Some(
      createNom('sound_setvolumeto', {
        volume: compileExpr(c, args[0]),
      })
    )
  }

  return None()
}

export const trySoundEntity = (c: CompileContext, entity: Entity): Opt<any> => {
  if (entity === soundVolumeEntity) {
    return Some(createNom('sound_volume', {}))
  }

  return None()
}
