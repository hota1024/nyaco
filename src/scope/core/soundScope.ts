import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { EntityKind, createFnArg } from '../EntityKind'

export const soundPlayUntilDoneEntity = createEntity(
  'play_until_done',
  EntityKind.Fn({
    args: [createFnArg('sound', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundPlayEntity = createEntity(
  'play',
  EntityKind.Fn({
    args: [createFnArg('sound', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundStopAllEntity = createEntity(
  'stop_all_sounds',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const soundChangeEffectByEntity = createEntity(
  'change_sound_effect_by',
  EntityKind.Fn({
    args: [createFnArg('effect', Ty.Any()), createFnArg('change', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundSetEffectToEntity = createEntity(
  'set_sound_effect',
  EntityKind.Fn({
    args: [createFnArg('effect', Ty.Any()), createFnArg('value', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundClearEffectsEntity = createEntity(
  'clear_sound_effects',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const soundChangeVolumeByEntity = createEntity(
  'change_volume_by',
  EntityKind.Fn({
    args: [createFnArg('change', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundSetVolumeToEntity = createEntity(
  'set_volume',
  EntityKind.Fn({
    args: [createFnArg('volume', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const soundVolumeEntity = createEntity(
  'volume',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const createSoundScope = (): Scope => {
  const scope = new Scope()

  scope.add(soundPlayUntilDoneEntity)
  scope.add(soundPlayEntity)
  scope.add(soundStopAllEntity)
  scope.add(soundChangeEffectByEntity)
  scope.add(soundSetEffectToEntity)
  scope.add(soundClearEffectsEntity)
  scope.add(soundChangeVolumeByEntity)
  scope.add(soundSetVolumeToEntity)
  scope.add(soundVolumeEntity)

  return scope
}
