import { Node } from '@/ast'
import { Entity } from '@/scope/Entity'
import { tryPenCall } from '@/scratch/pen/compile'
import { createNomList, NOM } from 'nyair'
import { createNom } from '@/nom/createNom'
import { compileExpr } from '.'
import { CompileContext } from '../context'
import { CompileError } from '../error'
import { tryControlCall } from './core/control'
import { tryEventCall } from './core/event'
import { tryListCall } from './core/list'
import { tryLooksCall } from './core/looks'
import { tryMotionCall } from './core/motion'
import { tryOpCall } from './core/op'
import { trySensingCall } from './core/sensing'
import { trySoundCall } from './core/sound'
import { tryVarCall } from './core/var'

export const compileCall = (
  c: CompileContext,
  node: Node,
  fn: Entity,
  args: Node[]
): NOM => {
  const kind = fn.kind
  if (kind.matches('Proc')) {
    const proc = kind.takeVariantValue()

    return createNom('$proc_call', {
      name: proc.name,
      args: createNomList(args.map((arg) => compileExpr(c, arg))),
    })
  }

  const control = tryControlCall(c, fn, args)
  if (control.isSome()) {
    return control.takeVariantValue()
  }

  const motion = tryMotionCall(c, fn, args)
  if (motion.isSome()) {
    return motion.takeVariantValue()
  }

  const event = tryEventCall(c, fn, args)
  if (event.isSome()) {
    return event.takeVariantValue()
  }

  const list = tryListCall(c, fn, args)
  if (list.isSome()) {
    return list.takeVariantValue()
  }

  const varResult = tryVarCall(c, fn, args)
  if (varResult.isSome()) {
    return varResult.takeVariantValue()
  }

  const looks = tryLooksCall(c, fn, args)
  if (looks.isSome()) {
    return looks.takeVariantValue()
  }

  const op = tryOpCall(c, fn, args)
  if (op.isSome()) {
    return op.takeVariantValue()
  }

  const sensing = trySensingCall(c, fn, args)
  if (sensing.isSome()) {
    return sensing.takeVariantValue()
  }

  const sound = trySoundCall(c, fn, args)
  if (sound.isSome()) {
    return sound.takeVariantValue()
  }

  const pen = tryPenCall(c, fn, args)
  if (pen.isSome()) {
    return pen.takeVariantValue()
  }

  throw new CompileError(`cannot generate call for \`${fn.name}\``, node.span)
}
