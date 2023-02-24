import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  motionMoveEntity,
  motionBounceIfOnEdgeEntity,
  motionTurnRightEntity,
  motionTurnLeftEntity,
  motionGotoEntity,
  motionGotoXYEntity,
  motionGlideToXYEntity,
  motionGlideToEntity,
  motionPointInDirectionEntity,
  motionPointToWardsEntity,
  motionChangeXEntity,
  motionChangeYEntity,
  motionSetXEntity,
  motionSetYEntity,
  motionSetRotationStyleEntity,
  motionXPositionEntity,
  motionYPositionEntity,
  motionDirectionEntity,
} from '@/scope/core/motionScope'
import { Entity } from '@/scope/Entity'
import { createNom, NOM } from 'nyair'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryMotionCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  if (fn === motionMoveEntity) {
    return Some(
      createNom('motion_movesteps', {
        steps: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionTurnRightEntity) {
    return Some(
      createNom('motion_turnright', {
        degrees: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionTurnLeftEntity) {
    return Some(
      createNom('motion_turnleft', {
        degrees: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionGotoEntity) {
    return Some(
      createNom('motion_goto', {
        to: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionGotoXYEntity) {
    return Some(
      createNom('motion_gotoxy', {
        x: compileExpr(c, args[0]),
        y: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === motionGlideToEntity) {
    return Some(
      createNom('motion_glideto', {
        secs: compileExpr(c, args[0]),
        to: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === motionGlideToXYEntity) {
    return Some(
      createNom('motion_glidesecstoxy', {
        secs: compileExpr(c, args[0]),
        x: compileExpr(c, args[1]),
        y: compileExpr(c, args[2]),
      })
    )
  }

  if (fn === motionPointInDirectionEntity) {
    return Some(
      createNom('motion_pointindirection', {
        direction: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionPointToWardsEntity) {
    return Some(
      createNom('motion_pointtowards', {
        towards: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionChangeXEntity) {
    return Some(
      createNom('motion_changexby', {
        dx: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionChangeYEntity) {
    return Some(
      createNom('motion_changeyby', {
        dy: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionSetXEntity) {
    return Some(
      createNom('motion_setx', {
        x: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionSetYEntity) {
    return Some(
      createNom('motion_sety', {
        y: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === motionBounceIfOnEdgeEntity) {
    return Some(createNom('motion_ifonedgebounce', {}))
  }

  if (fn === motionSetRotationStyleEntity) {
    return Some(
      createNom('motion_setrotationstyle', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style: args[0].kind.expect('LitStr').value as any,
      })
    )
  }

  return None()
}

export const tryMotionEntity = (
  c: CompileContext,
  entity: Entity
): Opt<NOM> => {
  if (entity === motionXPositionEntity) {
    return Some(createNom('motion_xposition', {}))
  }

  if (entity === motionYPositionEntity) {
    return Some(createNom('motion_yposition', {}))
  }

  if (entity === motionDirectionEntity) {
    return Some(createNom('motion_direction', {}))
  }

  return None()
}
