import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  listContainsEntity,
  listDeleteAllEntity,
  listDeleteAtEntity,
  listGetEntity,
  listHideEntity,
  listIndexEntity,
  listInsertEntity,
  listLengthEntity,
  listPushEntity,
  listReplaceEntity,
  listShowEntity,
} from '@/scope/core/listScope'
import { Entity } from '@/scope/Entity'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'
import { getAndDataEntity } from '../entity'

export const tryListCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  if (fn === listPushEntity) {
    return Some(
      createNom('data_addtolist', {
        list: getAndDataEntity(c, args[0]),
        item: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listDeleteAtEntity) {
    return Some(
      createNom('data_deleteoflist', {
        list: getAndDataEntity(c, args[0]),
        index: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listDeleteAllEntity) {
    return Some(
      createNom('data_deletealloflist', {
        list: getAndDataEntity(c, args[0]),
      })
    )
  }

  if (fn === listInsertEntity) {
    return Some(
      createNom('data_insertatlist', {
        list: getAndDataEntity(c, args[0]),
        index: compileExpr(c, args[1]),
        item: compileExpr(c, args[2]),
      })
    )
  }

  if (fn === listReplaceEntity) {
    return Some(
      createNom('data_replaceitemoflist', {
        list: getAndDataEntity(c, args[0]),
        index: compileExpr(c, args[1]),
        item: compileExpr(c, args[2]),
      })
    )
  }

  if (fn === listGetEntity) {
    return Some(
      createNom('data_itemoflist', {
        list: getAndDataEntity(c, args[0]),
        index: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listIndexEntity) {
    return Some(
      createNom('data_itemnumoflist', {
        list: getAndDataEntity(c, args[0]),
        item: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listLengthEntity) {
    return Some(
      createNom('data_lengthoflist', {
        list: getAndDataEntity(c, args[0]),
      })
    )
  }

  if (fn === listContainsEntity) {
    return Some(
      createNom('data_listcontainsitem', {
        list: getAndDataEntity(c, args[0]),
        item: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listContainsEntity) {
    return Some(
      createNom('data_listcontainsitem', {
        list: getAndDataEntity(c, args[0]),
        item: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === listShowEntity) {
    return Some(
      createNom('data_showlist', {
        list: getAndDataEntity(c, args[0]),
      })
    )
  }

  if (fn === listHideEntity) {
    return Some(
      createNom('data_hidelist', {
        list: getAndDataEntity(c, args[0]),
      })
    )
  }

  return None()
}

// export const tryListEntity = (
//   c: CompileContext,
//   entity: Entity
// ): Opt<any> => {
//   return None()
// }
