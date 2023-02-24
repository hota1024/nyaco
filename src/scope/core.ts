import { Scope } from '.'
import { createControlScope } from './core/controlScope'
import { createEventScope } from './core/eventScope'
import { createListScope } from './core/listScope'
import { createLooksScope } from './core/looksScope'
import { createMotionScope } from './core/motionScope'
import { createOpScope } from './core/op'
import { createSensingScope } from './core/sensingScope'
import { createSoundScope } from './core/soundScope'
import { createVarScope } from './core/varScope'
import { createEntity } from './Entity'
import { EntityKind } from './EntityKind'

export const createCoreScope = () => {
  const scope = new Scope()

  scope.add(
    createEntity('control', EntityKind.Scope({ scope: createControlScope() }))
  )

  scope.add(
    createEntity('event', EntityKind.Scope({ scope: createEventScope() }))
  )

  scope.add(
    createEntity('looks', EntityKind.Scope({ scope: createLooksScope() }))
  )

  scope.add(createEntity('var', EntityKind.Scope({ scope: createVarScope() })))
  scope.add(
    createEntity('list', EntityKind.Scope({ scope: createListScope() }))
  )

  scope.add(
    createEntity('motion', EntityKind.Scope({ scope: createMotionScope() }))
  )

  scope.add(createEntity('op', EntityKind.Scope({ scope: createOpScope() })))

  scope.add(
    createEntity('sensing', EntityKind.Scope({ scope: createSensingScope() }))
  )

  scope.add(
    createEntity('sound', EntityKind.Scope({ scope: createSoundScope() }))
  )

  return scope
}
