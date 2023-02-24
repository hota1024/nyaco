import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const sensingTouchingMouseEntity = createEntity(
  'touching_mouse',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Bool(),
  })
)

export const sensingTouchingEdgeEntity = createEntity(
  'touching_edge',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Bool(),
  })
)

export const sensingTouchingEntity = createEntity(
  'touching',
  EntityKind.Fn({
    args: [createFnArg('object_name', Ty.Any())],
    retTy: Ty.Bool(),
  })
)

export const sensingTouchingColorEntity = createEntity(
  'touching_color',
  EntityKind.Fn({
    args: [createFnArg('color', Ty.Any())],
    retTy: Ty.Bool(),
  })
)

export const sensingColorTouchingColorEntity = createEntity(
  'color_is_touching_color',
  EntityKind.Fn({
    args: [createFnArg('color1', Ty.Any()), createFnArg('color2', Ty.Any())],
    retTy: Ty.Bool(),
  })
)

export const sensingDistanceToMouseEntity = createEntity(
  'distance_to_mouse',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Any(),
  })
)

export const sensingDistanceToSpriteEntity = createEntity(
  'distance_to',
  EntityKind.Fn({
    args: [createFnArg('object_name', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const sensingAskAndWaitEntity = createEntity(
  'ask_and_wait',
  EntityKind.Fn({
    args: [createFnArg('question', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const sensingAnswerEntity = createEntity(
  'answer',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const sensingKeyPressedEntity = createEntity(
  'key_pressed',
  EntityKind.Fn({
    args: [createFnArg('key', Ty.Any())],
    retTy: Ty.Bool(),
  })
)

export const sensingMouseDownEntity = createEntity(
  'mouse_down',
  EntityKind.ScratchVar({
    ty: Ty.Bool(),
  })
)

export const sensingMouseXEntity = createEntity(
  'mouse_x',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const sensingMouseYEntity = createEntity(
  'mouse_y',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const sensingLoudnessEntity = createEntity(
  'loudness',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const sensingTimerEntity = createEntity(
  'timer',
  EntityKind.ScratchVar({
    ty: Ty.Any(),
  })
)

export const sensingResetTimerEntity = createEntity(
  'reset_timer',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

// export const sensingOf = createEntity(
//   'property',
//   EntityKind.Fn({
//     args: [createFnArg('property', Ty.Any()), createFnArg('object', Ty.Any())],
//   })
// )

export const sensingCurrentYearEntity = createEntity(
  'current_year',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentMonthEntity = createEntity(
  'current_month',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentDateEntity = createEntity(
  'current_date',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentDayOfWeekEntity = createEntity(
  'current_day_of_week',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentHourEntity = createEntity(
  'current_hour',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentMinuteEntity = createEntity(
  'current_minute',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingCurrentSecondEntity = createEntity(
  'current_second',
  EntityKind.Fn({ args: [], retTy: Ty.Any() })
)

export const sensingDaysSince2000Entity = createEntity(
  'days_since_2000',
  EntityKind.ScratchVar({ ty: Ty.Any() })
)

export const sensingUsernameEntity = createEntity(
  'username',
  EntityKind.ScratchVar({ ty: Ty.Any() })
)

export const createSensingScope = (): Scope => {
  const scope = new Scope()

  scope.add(sensingTouchingMouseEntity)
  scope.add(sensingTouchingEdgeEntity)
  scope.add(sensingTouchingEntity)
  scope.add(sensingTouchingColorEntity)
  scope.add(sensingColorTouchingColorEntity)
  scope.add(sensingDistanceToMouseEntity)
  scope.add(sensingDistanceToSpriteEntity)
  scope.add(sensingAskAndWaitEntity)
  scope.add(sensingAnswerEntity)
  scope.add(sensingKeyPressedEntity)
  scope.add(sensingMouseDownEntity)
  scope.add(sensingMouseXEntity)
  scope.add(sensingMouseYEntity)
  scope.add(sensingLoudnessEntity)
  scope.add(sensingTimerEntity)
  scope.add(sensingResetTimerEntity)
  scope.add(sensingCurrentYearEntity)
  scope.add(sensingCurrentMonthEntity)
  scope.add(sensingCurrentDateEntity)
  scope.add(sensingCurrentDayOfWeekEntity)
  scope.add(sensingCurrentHourEntity)
  scope.add(sensingCurrentMinuteEntity)
  scope.add(sensingCurrentSecondEntity)
  scope.add(sensingDaysSince2000Entity)
  scope.add(sensingUsernameEntity)

  return scope
}
