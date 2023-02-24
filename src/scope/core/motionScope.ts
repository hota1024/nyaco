import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const motionMoveEntity = createEntity(
  'move',
  EntityKind.Fn({
    args: [createFnArg('steps', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionTurnRightEntity = createEntity(
  'turn_right',
  EntityKind.Fn({
    args: [createFnArg('degrees', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionTurnLeftEntity = createEntity(
  'turn_left',
  EntityKind.Fn({
    args: [createFnArg('degrees', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionGotoEntity = createEntity(
  'goto',
  EntityKind.Fn({
    args: [createFnArg('to', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionGotoXYEntity = createEntity(
  'goto_xy',
  EntityKind.Fn({
    args: [createFnArg('x', Ty.Any()), createFnArg('y', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionGlideToEntity = createEntity(
  'glide_to',
  EntityKind.Fn({
    args: [createFnArg('secs', Ty.Any()), createFnArg('to', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionGlideToXYEntity = createEntity(
  'glide_to_xy',
  EntityKind.Fn({
    args: [
      createFnArg('secs', Ty.Any()),
      createFnArg('x', Ty.Any()),
      createFnArg('y', Ty.Any()),
    ],
    retTy: Ty.Void(),
  })
)

export const motionPointInDirectionEntity = createEntity(
  'point_in_direction',
  EntityKind.Fn({
    args: [createFnArg('direction', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionPointToWardsEntity = createEntity(
  'point_to_wards',
  EntityKind.Fn({
    args: [createFnArg('to', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionChangeXEntity = createEntity(
  'change_x_by',
  EntityKind.Fn({
    args: [createFnArg('dx', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionChangeYEntity = createEntity(
  'change_y_by',
  EntityKind.Fn({
    args: [createFnArg('dy', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionSetXEntity = createEntity(
  'set_x',
  EntityKind.Fn({
    args: [createFnArg('x', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionSetYEntity = createEntity(
  'set_y',
  EntityKind.Fn({
    args: [createFnArg('y', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionBounceIfOnEdgeEntity = createEntity(
  'bounce_if_on_edge',
  EntityKind.Fn({ args: [], retTy: Ty.Void() })
)

export const motionSetRotationStyleEntity = createEntity(
  'set_rotation_style',
  EntityKind.Fn({
    args: [createFnArg('style', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const motionXPositionEntity = createEntity(
  'x_position',
  EntityKind.ScratchVar({ ty: Ty.Num() })
)

export const motionYPositionEntity = createEntity(
  'y_position',
  EntityKind.ScratchVar({ ty: Ty.Num() })
)

export const motionDirectionEntity = createEntity(
  'direction',
  EntityKind.ScratchVar({ ty: Ty.Num() })
)

export const createMotionScope = () => {
  const scope = new Scope()

  scope.add(motionMoveEntity)
  scope.add(motionTurnRightEntity)
  scope.add(motionTurnLeftEntity)
  scope.add(motionGotoEntity)
  scope.add(motionGotoXYEntity)
  scope.add(motionGlideToEntity)
  scope.add(motionGlideToXYEntity)
  scope.add(motionPointInDirectionEntity)
  scope.add(motionPointToWardsEntity)
  scope.add(motionChangeXEntity)
  scope.add(motionChangeYEntity)
  scope.add(motionSetXEntity)
  scope.add(motionSetYEntity)
  scope.add(motionBounceIfOnEdgeEntity)
  scope.add(motionSetRotationStyleEntity)
  scope.add(motionXPositionEntity)
  scope.add(motionYPositionEntity)
  scope.add(motionDirectionEntity)

  return scope
}
