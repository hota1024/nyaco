import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const looksSayForEntity = createEntity(
  'say_for',
  EntityKind.Fn({
    args: [createFnArg('message', Ty.Any()), createFnArg('secs', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksSayEntity = createEntity(
  'say',
  EntityKind.Fn({
    args: [createFnArg('message', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksThinkForEntity = createEntity(
  'think_for',
  EntityKind.Fn({
    args: [createFnArg('message', Ty.Any()), createFnArg('secs', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksThinkEntity = createEntity(
  'think',
  EntityKind.Fn({
    args: [createFnArg('message', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksSwitchCsotume = createEntity(
  'switch_costume',
  EntityKind.Fn({
    args: [createFnArg('costume', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksNextCostume = createEntity(
  'next_costume',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksSwitchBackdrop = createEntity(
  'switch_backdrop',
  EntityKind.Fn({
    args: [createFnArg('backdrop', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksNextBackdrop = createEntity(
  'next_backdrop',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksChangeSizeByEntity = createEntity(
  'change_size_by',
  EntityKind.Fn({
    args: [createFnArg('change', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksSetSizeEntity = createEntity(
  'set_size',
  EntityKind.Fn({
    args: [createFnArg('size', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksChangeEffectByEntity = createEntity(
  'change_effect_by',
  EntityKind.Fn({
    args: [createFnArg('effect', Ty.Any()), createFnArg('change', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksSetEffectEntity = createEntity(
  'set_effect',
  EntityKind.Fn({
    args: [createFnArg('effect', Ty.Any()), createFnArg('value', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksClearEffectsEntity = createEntity(
  'clear_effects',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksShowEntity = createEntity(
  'show',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksHideEntity = createEntity(
  'hide',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksGoToFrontEntity = createEntity(
  'go_to_layer_front',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksGoToBackEntity = createEntity(
  'go_to_layer_back',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const looksChangeLayerByEntity = createEntity(
  'change_layer_by',
  EntityKind.Fn({
    args: [createFnArg('change', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const looksCostumeNumberEntity = createEntity(
  'costume_number',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Num(),
  })
)

export const looksCostumeNameEntity = createEntity(
  'costume_name',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Any(),
  })
)

export const looksBackdropNumberEntity = createEntity(
  'backdrop_number',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Num(),
  })
)

export const looksBackdropNameEntity = createEntity(
  'backdrop_name',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Any(),
  })
)

export const looksSizeEntity = createEntity(
  'size',
  EntityKind.ScratchVar({
    ty: Ty.Num(),
  })
)

export const createLooksScope = (): Scope => {
  const scope = new Scope()

  scope.add(looksSayForEntity)
  scope.add(looksSayEntity)
  scope.add(looksThinkForEntity)
  scope.add(looksThinkEntity)
  scope.add(looksSwitchCsotume)
  scope.add(looksNextCostume)
  scope.add(looksSwitchBackdrop)
  scope.add(looksNextBackdrop)
  scope.add(looksChangeSizeByEntity)
  scope.add(looksSetSizeEntity)
  scope.add(looksChangeEffectByEntity)
  scope.add(looksSetEffectEntity)
  scope.add(looksClearEffectsEntity)
  scope.add(looksShowEntity)
  scope.add(looksHideEntity)
  scope.add(looksGoToFrontEntity)
  scope.add(looksGoToBackEntity)
  scope.add(looksChangeLayerByEntity)
  scope.add(looksCostumeNumberEntity)
  scope.add(looksCostumeNameEntity)
  scope.add(looksBackdropNumberEntity)
  scope.add(looksBackdropNameEntity)
  scope.add(looksSizeEntity)

  return scope
}
