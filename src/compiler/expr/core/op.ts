import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  opAbsEntity,
  opAcosEntity,
  opAsinEntity,
  opAtanEntity,
  opCeilingEntity,
  opCharAtEntity,
  opContainsEntity,
  opCosEntity,
  opExpEntity,
  opFloorEntity,
  opJoinEntity,
  opLengthEntity,
  opLog10Entity,
  opLogEntity,
  opPow10Entity,
  opRandomEntity,
  opRoundEntity,
  opSinEntity,
  opSqrtEntity,
  opTanEntity,
} from '@/scope/core/op'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryOpCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  if (fn === opRandomEntity) {
    return Some(
      createNom('operator_random', {
        from: compileExpr(c, args[0]),
        to: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === opJoinEntity) {
    return Some(
      createNom('operator_join', {
        string1: compileExpr(c, args[0]),
        string2: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === opLengthEntity) {
    return Some(
      createNom('operator_length', {
        string: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opCharAtEntity) {
    return Some(
      createNom('operator_letter_of', {
        letter: compileExpr(c, args[1]),
        string: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opContainsEntity) {
    return Some(
      createNom('operator_contains', {
        string1: compileExpr(c, args[0]),
        string2: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === opRoundEntity) {
    return Some(
      createNom('operator_round', {
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opAbsEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'abs',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opFloorEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'floor',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opCeilingEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'ceiling',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opSqrtEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'sqrt',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opSinEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'sin',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opCosEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'cos',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opTanEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'tan',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opAsinEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'asin',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opAcosEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'acos',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opAtanEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'atan',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opLogEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'ln',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opLog10Entity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'log',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opExpEntity) {
    return Some(
      createNom('operator_mathop', {
        operator: 'e ^',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === opPow10Entity) {
    return Some(
      createNom('operator_mathop', {
        operator: '10 ^',
        num: compileExpr(c, args[0]),
      })
    )
  }

  return None()
}

// export const tryOpEntity = (c: CompileContext, entity: Entity): Opt<NOM> => {
//   return None()
// }
