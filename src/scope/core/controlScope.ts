import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const controlWaitEntity = createEntity(
  'wait',
  EntityKind.Fn({
    args: [createFnArg('duration', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const controlStopAllEntity = createEntity(
  'stop_all',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const controlStopThisScriptEntity = createEntity(
  'stop_this_script',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const controlStopOtherScriptsInSpriteEntity = createEntity(
  'stop_other_scripts_in_sprite',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const controlCreateCloneEntity = createEntity(
  'create_clone',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const controlCreateCloneOfEntity = createEntity(
  'create_clone_of',
  EntityKind.Fn({
    args: [createFnArg('sprite', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const controlDeleteThisCloneEntity = createEntity(
  'delete_this_clone',
  EntityKind.Fn({
    args: [],
    retTy: Ty.Void(),
  })
)

export const createControlScope = (): Scope => {
  const scope = new Scope()

  scope.add(controlWaitEntity)
  scope.add(controlStopAllEntity)
  scope.add(controlStopThisScriptEntity)
  scope.add(controlStopOtherScriptsInSpriteEntity)
  scope.add(controlCreateCloneEntity)
  scope.add(controlCreateCloneOfEntity)
  scope.add(controlDeleteThisCloneEntity)

  return scope
}
