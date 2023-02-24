import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  sensingAnswerEntity,
  sensingAskAndWaitEntity,
  sensingColorTouchingColorEntity,
  sensingCurrentDateEntity,
  sensingCurrentDayOfWeekEntity,
  sensingCurrentHourEntity,
  sensingCurrentMinuteEntity,
  sensingCurrentMonthEntity,
  sensingCurrentSecondEntity,
  sensingDaysSince2000Entity,
  sensingDistanceToMouseEntity,
  sensingDistanceToSpriteEntity,
  sensingKeyPressedEntity,
  sensingLoudnessEntity,
  sensingMouseDownEntity,
  sensingMouseXEntity,
  sensingMouseYEntity,
  sensingResetTimerEntity,
  sensingTimerEntity,
  sensingTouchingColorEntity,
  sensingTouchingEdgeEntity,
  sensingTouchingEntity,
  sensingTouchingMouseEntity,
  sensingUsernameEntity,
} from '@/scope/core/sensingScope'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const trySensingCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  if (fn === sensingTouchingMouseEntity) {
    return Some(
      createNom('sensing_touchingobject', {
        touchingObjectMenu: createNom('sensing_touchingobjectmenu', {
          touchingObjectMenu: 'mouse-pointer',
        }),
      })
    )
  }

  if (fn === sensingTouchingEdgeEntity) {
    return Some(
      createNom('sensing_touchingobject', {
        touchingObjectMenu: createNom('sensing_touchingobjectmenu', {
          touchingObjectMenu: 'edge',
        }),
      })
    )
  }

  if (fn === sensingTouchingEntity) {
    return Some(
      createNom('sensing_touchingobject', {
        touchingObjectMenu: createNom('sensing_touchingobjectmenu', {
          touchingObjectMenu: args[0].kind.expect('LitStr').value,
        }),
      })
    )
  }

  if (fn === sensingTouchingColorEntity) {
    return Some(
      createNom('sensing_touchingcolor', {
        color: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === sensingColorTouchingColorEntity) {
    return Some(
      createNom('sensing_coloristouchingcolor', {
        color: compileExpr(c, args[0]),
        color2: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === sensingDistanceToMouseEntity) {
    return Some(
      createNom('sensing_distanceto', {
        distanceToMenu: createNom('sensing_distancetomenu', {
          distanceToMenu: 'mouse-pointer',
        }),
      })
    )
  }

  if (fn === sensingDistanceToSpriteEntity) {
    return Some(
      createNom('sensing_distanceto', {
        distanceToMenu: createNom('sensing_distancetomenu', {
          distanceToMenu: args[0].kind.expect('LitStr').value,
        }),
      })
    )
  }

  if (fn === sensingAskAndWaitEntity) {
    return Some(
      createNom('sensing_askandwait', {
        question: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === sensingKeyPressedEntity) {
    return Some(
      createNom('sensing_keypressed', {
        keyOption: createNom('sensing_keyoptions', {
          keyOption: args[0].kind.expect('LitStr').value,
        }),
      })
    )
  }

  if (fn === sensingResetTimerEntity) {
    return Some(createNom('sensing_resettimer', {}))
  }

  if (fn === sensingCurrentMonthEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'MONTH',
      })
    )
  }

  if (fn === sensingCurrentDateEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'DATE',
      })
    )
  }

  if (fn === sensingCurrentDayOfWeekEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'DAYOFWEEK',
      })
    )
  }

  if (fn === sensingCurrentHourEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'HOUR',
      })
    )
  }

  if (fn === sensingCurrentMinuteEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'MINUTE',
      })
    )
  }

  if (fn === sensingCurrentSecondEntity) {
    return Some(
      createNom('sensing_current', {
        currentMenu: 'SECOND',
      })
    )
  }

  return None()
}

export const trySensingEntity = (
  c: CompileContext,
  entity: Entity
): Opt<NOM> => {
  if (entity === sensingAnswerEntity) {
    return Some(createNom('sensing_answer', {}))
  }

  if (entity === sensingMouseDownEntity) {
    return Some(createNom('sensing_mousedown', {}))
  }

  if (entity === sensingMouseXEntity) {
    return Some(createNom('sensing_mousex', {}))
  }

  if (entity === sensingMouseYEntity) {
    return Some(createNom('sensing_mousey', {}))
  }

  if (entity === sensingLoudnessEntity) {
    return Some(createNom('sensing_loudness', {}))
  }

  if (entity === sensingTimerEntity) {
    return Some(createNom('sensing_timer', {}))
  }

  if (entity === sensingDaysSince2000Entity) {
    return Some(createNom('sensing_dayssince2000', {}))
  }

  if ((entity = sensingUsernameEntity)) {
    return Some(createNom('sensing_username', {}))
  }

  return None()
}
