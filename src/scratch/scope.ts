import { Scope } from '@/scope'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { createPenScope } from './pen/scope'

export const createScratchScope = (): Scope => {
  const scope = new Scope()

  scope.add(
    createEntity(
      'pen',
      EntityKind.Scope({
        scope: createPenScope(),
      })
    )
  )

  return scope
}
