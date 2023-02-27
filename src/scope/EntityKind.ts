import { Ty } from '@/ty'
import { List, Variable } from 'nyair'
import { Enum } from 'rs-enums'
import { Scope } from '.'

export type FnArg = {
  name: string
  ty: Ty
}

export type ProcArg = {
  name: string
  ty: Ty
}

export const createFnArg = (name: string, ty: Ty): FnArg => ({
  name,
  ty,
})

export type EntityKindVariants = {
  Fn: {
    args: FnArg[]
    retTy: Ty
  }
  ScratchVar: {
    ty: Ty
  }
  Var: {
    variable: Variable
  }
  List: {
    list: List
  }
  Scope: {
    scope: Scope
  }
  Proc: {
    name: string
    args: ProcArg[]
  }
  ProcParam: {
    name: string
    ty: Ty
  }
  Let: {
    ty: Ty
    offset: number
  }
}

export class EntityKind extends Enum<EntityKindVariants> {
  static Fn = (data: EntityKindVariants['Fn']) => new EntityKind('Fn', data)
  static ScratchVar = (data: EntityKindVariants['ScratchVar']) =>
    new EntityKind('ScratchVar', data)

  static Var = (data: EntityKindVariants['Var']) => new EntityKind('Var', data)
  static List = (data: EntityKindVariants['List']) =>
    new EntityKind('List', data)

  static Scope = (data: EntityKindVariants['Scope']) =>
    new EntityKind('Scope', data)

  static Proc = (data: EntityKindVariants['Proc']) =>
    new EntityKind('Proc', data)
  static ProcParam = (data: EntityKindVariants['ProcParam']) =>
    new EntityKind('ProcParam', data)

  static Let = (data: EntityKindVariants['Let']) => new EntityKind('Let', data)
}
