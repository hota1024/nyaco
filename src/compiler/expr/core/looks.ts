import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import {
  looksBackdropNameEntity,
  looksBackdropNumberEntity,
  looksChangeEffectByEntity,
  looksChangeLayerByEntity,
  looksChangeSizeByEntity,
  looksClearEffectsEntity,
  looksCostumeNameEntity,
  looksCostumeNumberEntity,
  looksGoToBackEntity,
  looksGoToFrontEntity,
  looksHideEntity,
  looksNextBackdrop,
  looksNextCostume,
  looksSayEntity,
  looksSayForEntity,
  looksSetEffectEntity,
  looksSetSizeEntity,
  looksShowEntity,
  looksSizeEntity,
  looksSwitchBackdrop,
  looksSwitchCsotume,
  looksThinkEntity,
  looksThinkForEntity,
} from '@/scope/core/looksScope'
import { Entity } from '@/scope/Entity'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import { compileExpr } from '..'

export const tryLooksCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<any> => {
  if (fn === looksSayForEntity) {
    return Some(
      createNom('looks_sayforsecs', {
        message: compileExpr(c, args[0]),
        secs: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === looksSayEntity) {
    return Some(
      createNom('looks_say', {
        message: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksThinkForEntity) {
    return Some(
      createNom('looks_thinkforsecs', {
        message: compileExpr(c, args[0]),
        secs: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === looksThinkEntity) {
    return Some(
      createNom('looks_think', {
        message: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksSwitchCsotume) {
    return Some(
      createNom('looks_switchcostumeto', {
        costume: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksNextCostume) {
    return Some(createNom('looks_nextcostume', {}))
  }

  if (fn === looksSwitchBackdrop) {
    return Some(
      createNom('looks_switchbackdropto', {
        backdrop: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksNextBackdrop) {
    return Some(createNom('looks_nextbackdrop', {}))
  }

  if (fn === looksChangeSizeByEntity) {
    return Some(
      createNom('looks_changesizeby', {
        change: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksSetSizeEntity) {
    return Some(
      createNom('looks_setsizeto', {
        size: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksChangeEffectByEntity) {
    return Some(
      createNom('looks_changeeffectby', {
        effect: args[0].kind.expect('LitStr').value,
        change: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === looksSetEffectEntity) {
    return Some(
      createNom('looks_seteffectto', {
        effect: args[0].kind.expect('LitStr').value,
        value: compileExpr(c, args[1]),
      })
    )
  }

  if (fn === looksClearEffectsEntity) {
    return Some(createNom('looks_cleargraphiceffects', {}))
  }

  if (fn === looksShowEntity) {
    return Some(createNom('looks_show', {}))
  }

  if (fn === looksHideEntity) {
    return Some(createNom('looks_hide', {}))
  }

  if (fn === looksGoToFrontEntity) {
    return Some(
      createNom('looks_gotofrontback', {
        frontBack: 'front',
      })
    )
  }

  if (fn === looksGoToBackEntity) {
    return Some(
      createNom('looks_gotofrontback', {
        frontBack: 'back',
      })
    )
  }

  if (fn === looksChangeLayerByEntity) {
    return Some(
      createNom('looks_goforwardbackwardlayers', {
        forwardBackward: 'forward',
        num: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === looksCostumeNumberEntity) {
    return Some(
      createNom('looks_costumenumbername', {
        numberName: 'number',
      })
    )
  }

  if (fn === looksCostumeNameEntity) {
    return Some(
      createNom('looks_costumenumbername', {
        numberName: 'name',
      })
    )
  }

  if (fn === looksBackdropNumberEntity) {
    return Some(
      createNom('looks_backdropnumbername', {
        numberName: 'number',
      })
    )
  }

  if (fn === looksBackdropNameEntity) {
    return Some(
      createNom('looks_backdropnumbername', {
        numberName: 'name',
      })
    )
  }

  return None()
}

export const tryLooksEntity = (c: CompileContext, entity: Entity): Opt<any> => {
  if (entity === looksSizeEntity) {
    return Some(createNom('looks_size', {}))
  }

  return None()
}
