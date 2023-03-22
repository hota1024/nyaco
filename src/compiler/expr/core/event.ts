import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  eventBroadcastAndWaitEntity,
  eventBroadcastEntity,
} from '@/scope/core/eventScope'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryEventCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  if (fn === eventBroadcastEntity) {
    return args[0].kind.match({
      LitStr(value) {
        return Some(
          createNom('event_broadcast', {
            broadcast: createNom('$literal_broadcast', {
              value: value.value,
            }),
          })
        )
      },
      _() {
        return Some(
          createNom('event_broadcast', {
            broadcast: compileExpr(c, args[0]),
          })
        )
      },
    })
  }

  if (fn === eventBroadcastAndWaitEntity) {
    return Some(
      createNom('event_broadcastandwait', {
        broadcast: compileExpr(c, args[0]),
      })
    )
  }

  return None()
}

// export const tryEventEntity = (
//   c: CompileContext,
//   entity: Entity
// ): Opt<any> => {
//   return None()
// }
