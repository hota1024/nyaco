import { Scope } from '@/scope'
import { createCoreScope } from '@/scope/core'
import { EntityKind } from '@/scope/EntityKind'
import { createScratchScope } from '@/scratch/scope'

export const createRootScope = (): Scope => {
  const scope = new Scope()

  const coreScope = createCoreScope()
  scope.add({
    name: 'core',
    kind: EntityKind.Scope({
      scope: coreScope,
    }),
  })

  const scratchScope = createScratchScope()
  scope.add({
    name: 'scratch',
    kind: EntityKind.Scope({
      scope: scratchScope,
    }),
  })

  return scope
}
