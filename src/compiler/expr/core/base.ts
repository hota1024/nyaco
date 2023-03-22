import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import { Entity } from '@/scope/Entity'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryMotionCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  return None()
}

export const tryMotionEntity = (
  c: CompileContext,
  entity: Entity
): Opt<any> => {
  return None()
}
