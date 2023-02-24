import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const eventBroadcastEntity = createEntity(
  'broadcast',
  EntityKind.Fn({
    args: [createFnArg('event', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const eventBroadcastAndWaitEntity = createEntity(
  'broadcast_and_wait',
  EntityKind.Fn({
    args: [createFnArg('event', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const createEventScope = () => {
  const scope = new Scope()

  scope.add(eventBroadcastEntity)
  scope.add(eventBroadcastAndWaitEntity)

  return scope
}
