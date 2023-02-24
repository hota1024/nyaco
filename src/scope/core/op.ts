import { Ty } from '@/ty'
import { Scope } from '..'
import { createEntity } from '../Entity'
import { EntityKind, createFnArg } from '../EntityKind'

export const opRandomEntity = createEntity(
  'random',
  EntityKind.Fn({
    args: [createFnArg('from', Ty.Any()), createFnArg('to', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opJoinEntity = createEntity(
  'join',
  EntityKind.Fn({
    args: [createFnArg('string1', Ty.Any()), createFnArg('string2', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opLengthEntity = createEntity(
  'length',
  EntityKind.Fn({
    args: [createFnArg('string', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opCharAtEntity = createEntity(
  'char_at',
  EntityKind.Fn({
    args: [createFnArg('string', Ty.Any()), createFnArg('index', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opContainsEntity = createEntity(
  'contains',
  EntityKind.Fn({
    args: [createFnArg('string', Ty.Any()), createFnArg('substring', Ty.Any())],
    retTy: Ty.Bool(),
  })
)

export const opRoundEntity = createEntity(
  'round',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opAbsEntity = createEntity(
  'abs',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opFloorEntity = createEntity(
  'floor',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opCeilingEntity = createEntity(
  'ceil',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opSqrtEntity = createEntity(
  'sqrt',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opSinEntity = createEntity(
  'sin',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opCosEntity = createEntity(
  'cos',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opTanEntity = createEntity(
  'tan',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opAsinEntity = createEntity(
  'asin',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opAcosEntity = createEntity(
  'acos',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opAtanEntity = createEntity(
  'atan',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opLogEntity = createEntity(
  'log',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opLog10Entity = createEntity(
  'log10',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opExpEntity = createEntity(
  'exp',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const opPow10Entity = createEntity(
  'pow10',
  EntityKind.Fn({
    args: [createFnArg('number', Ty.Any())],
    retTy: Ty.Any(),
  })
)

export const createOpScope = (): Scope => {
  const scope = new Scope()

  scope.add(opRandomEntity)
  scope.add(opJoinEntity)
  scope.add(opLengthEntity)
  scope.add(opCharAtEntity)
  scope.add(opContainsEntity)
  scope.add(opRoundEntity)
  scope.add(opAbsEntity)
  scope.add(opFloorEntity)
  scope.add(opCeilingEntity)
  scope.add(opSqrtEntity)
  scope.add(opSinEntity)
  scope.add(opCosEntity)
  scope.add(opTanEntity)
  scope.add(opAsinEntity)
  scope.add(opAcosEntity)
  scope.add(opAtanEntity)
  scope.add(opLogEntity)
  scope.add(opLog10Entity)
  scope.add(opExpEntity)
  scope.add(opPow10Entity)

  return scope
}
