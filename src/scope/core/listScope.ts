import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { EntityKind, createFnArg } from '../EntityKind'

export const listPushEntity = createEntity(
  'list_push',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('value', Ty.Any()),
    ],
    retTy: Ty.Void(),
  })
)

export const listDeleteAtEntity = createEntity(
  'list_delete',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('index', Ty.Any()),
    ],
    retTy: Ty.Void(),
  })
)

export const listDeleteAllEntity = createEntity(
  'list_delete_all',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityList())],
    retTy: Ty.Void(),
  })
)

export const listInsertEntity = createEntity(
  'list_insert',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('index', Ty.Any()),
      createFnArg('value', Ty.Any()),
    ],
    retTy: Ty.Void(),
  })
)

export const listReplaceEntity = createEntity(
  'list_replace',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('index', Ty.Any()),
      createFnArg('value', Ty.Any()),
    ],
    retTy: Ty.Void(),
  })
)

export const listGetEntity = createEntity(
  'list_get',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('index', Ty.Any()),
    ],
    retTy: Ty.Any(),
  })
)

export const listIndexEntity = createEntity(
  'list_index',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('value', Ty.Any()),
    ],
    retTy: Ty.Any(),
  })
)

export const listLengthEntity = createEntity(
  'list_length',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityList())],
    retTy: Ty.Any(),
  })
)

export const listContainsEntity = createEntity(
  'list_contains',
  EntityKind.Fn({
    args: [
      createFnArg('self', Ty.EntityList()),
      createFnArg('value', Ty.Any()),
    ],
    retTy: Ty.Bool(),
  })
)

export const listShowEntity = createEntity(
  'list_show',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityList())],
    retTy: Ty.Void(),
  })
)

export const listHideEntity = createEntity(
  'list_hide',
  EntityKind.Fn({
    args: [createFnArg('self', Ty.EntityList())],
    retTy: Ty.Void(),
  })
)

export const createListScope = (): Scope => {
  const scope = new Scope()

  scope.add(listPushEntity)
  scope.add(listDeleteAtEntity)
  scope.add(listDeleteAllEntity)
  scope.add(listInsertEntity)
  scope.add(listReplaceEntity)
  scope.add(listGetEntity)
  scope.add(listIndexEntity)
  scope.add(listLengthEntity)
  scope.add(listContainsEntity)
  scope.add(listShowEntity)
  scope.add(listHideEntity)

  return scope
}
