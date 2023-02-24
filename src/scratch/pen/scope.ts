import { Scope } from '@/scope'
import { createEntity } from '@/scope/Entity'
import { createFnArg, EntityKind } from '@/scope/EntityKind'
import { Ty } from '@/ty'

export const penClearEntity = createEntity(
  'clear',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const penStampEntity = createEntity(
  'stamp',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const penDownEntity = createEntity(
  'down',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const penUpEntity = createEntity(
  'up',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const penSetColorEntity = createEntity(
  'set_color',
  EntityKind.Fn({
    args: [createFnArg('color', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penSetSaturationEntity = createEntity(
  'set_saturation',
  EntityKind.Fn({
    args: [createFnArg('saturation', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penSetBrightnessEntity = createEntity(
  'set_brightness',
  EntityKind.Fn({
    args: [createFnArg('brightness', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penSetTransparencyEntity = createEntity(
  'set_transparency',
  EntityKind.Fn({
    args: [createFnArg('transparency', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penChangeColorEntity = createEntity(
  'change_color_by',
  EntityKind.Fn({
    args: [createFnArg('color', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penChangeSaturationEntity = createEntity(
  'change_saturation_by',
  EntityKind.Fn({
    args: [createFnArg('saturation', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penChangeBrightnessEntity = createEntity(
  'change_brightness_by',
  EntityKind.Fn({
    args: [createFnArg('brightness', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penChangeTransparencyEntity = createEntity(
  'change_transparency_by',
  EntityKind.Fn({
    args: [createFnArg('transparency', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penChangeSizeByEntity = createEntity(
  'change_size_by',
  EntityKind.Fn({
    args: [createFnArg('size', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const penSetSizeEntity = createEntity(
  'set_size',
  EntityKind.Fn({
    args: [createFnArg('size', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const createPenScope = (): Scope => {
  const scope = new Scope()

  scope.add(penClearEntity)
  scope.add(penStampEntity)
  scope.add(penDownEntity)
  scope.add(penUpEntity)
  scope.add(penSetColorEntity)
  scope.add(penSetSaturationEntity)
  scope.add(penSetBrightnessEntity)
  scope.add(penSetTransparencyEntity)
  scope.add(penChangeColorEntity)
  scope.add(penChangeSaturationEntity)
  scope.add(penChangeBrightnessEntity)
  scope.add(penChangeTransparencyEntity)
  scope.add(penChangeSizeByEntity)
  scope.add(penSetSizeEntity)

  return scope
}
