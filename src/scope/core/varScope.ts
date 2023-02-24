import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { createFnArg, EntityKind } from '../EntityKind'

export const varSetEntity = createEntity(
  'var_set',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityVar()), createFnArg('value', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const varAddEntity = createEntity(
  'var_add',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityVar()), createFnArg('value', Ty.Any())],
    retTy: Ty.Void(),
  })
)

export const varShowEntity = createEntity(
  'var_show',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityVar())],
    retTy: Ty.Void(),
  })
)

export const varHideEntity = createEntity(
  'var_hide',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityVar())],
    retTy: Ty.Void(),
  })
)

export const createVarScope = (): Scope => {
  const scope = new Scope()

  scope.add(varSetEntity)
  scope.add(varAddEntity)
  scope.add(varShowEntity)
  scope.add(varHideEntity)

  return scope
}
