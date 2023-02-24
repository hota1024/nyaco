import { Node } from '@/ast'
import { Entity } from '@/scope/Entity'
import { NOM, createNom } from 'nyair'
import { CompileContext } from '../context'
import { CompileError } from '../error'
import { tryLooksEntity } from './core/looks'
import { tryMotionEntity } from './core/motion'
import { trySensingEntity } from './core/sensing'
import { trySoundEntity } from './core/sound'

export const compileEntity = (
  c: CompileContext,
  node: Node,
  entity: Entity
): NOM => {
  return entity.kind.match({
    Var({ variable: { name } }) {
      return createNom('$data_variable', { variable: name }) as NOM
    },
    List({ list: { name } }) {
      return createNom('$data_list', { list: name }) as NOM
    },
    ScratchVar() {
      const motion = tryMotionEntity(c, entity)
      if (motion.isSome()) {
        return motion.takeVariantValue() as NOM
      }

      const looks = tryLooksEntity(c, entity)
      if (looks.isSome()) {
        return looks.takeVariantValue() as NOM
      }

      const sensing = trySensingEntity(c, entity)
      if (sensing.isSome()) {
        return sensing.takeVariantValue() as NOM
      }

      const sound = trySoundEntity(c, entity)
      if (sound.isSome()) {
        return sound.takeVariantValue() as NOM
      }

      throw new CompileError(`cannot generate entity`, node.span)
    },
    ProcParam(value) {
      return createNom('$proc_arg', { name: value.name }) as NOM
    },
    _() {
      throw new CompileError(
        `\`${entity.name}\` is not a variable or list or parameter`,
        node.span
      )
    },
  })
}

export const getAndDataEntity = (c: CompileContext, node: Node): string => {
  return node.kind.match({
    AndEntity({ entity }) {
      const instance = c.resolveScopeEntity(entity)
      return instance.kind.match({
        List(value) {
          return value.list.name
        },
        Var(value) {
          return value.variable.name
        },
        _() {
          throw new CompileError(`expected &list or &var`, node.span)
        },
      })
    },
    _() {
      throw new CompileError(`expected &list or &var`, node.span)
    },
  })
}
