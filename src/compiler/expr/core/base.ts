import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryMotionCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  return None()
}

export const tryMotionEntity = (
  c: CompileContext,
  entity: Entity
): Opt<NOM> => {
  return None()
}
