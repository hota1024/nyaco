import { Node } from '@/ast'
import { CompileContext } from '@/compiler/context'
import { compileExpr } from '@/compiler/expr'
import { Entity } from '@/scope/Entity'
import { NOM } from 'nyair'
import { createNom } from '@/nom/createNom'
import { None, Opt, Some } from 'rs-enums'
import {
  penChangeBrightnessEntity,
  penChangeColorEntity,
  penChangeSaturationEntity,
  penChangeSizeByEntity,
  penClearEntity,
  penDownEntity,
  penSetBrightnessEntity,
  penSetColorEntity,
  penSetSaturationEntity,
  penSetSizeEntity,
  penSetTransparencyEntity,
  penStampEntity,
  penUpEntity,
} from './scope'

export const tryPenCall = (
  c: CompileContext,
  fn: Entity,
  args: Node[]
): Opt<NOM> => {
  if (fn === penClearEntity) {
    return Some(createNom('pen_clear', {}))
  }

  if (fn === penStampEntity) {
    return Some(createNom('pen_stamp', {}))
  }

  if (fn === penDownEntity) {
    return Some(createNom('pen_penDown', {}))
  }

  if (fn === penUpEntity) {
    return Some(createNom('pen_penUp', {}))
  }

  if (fn === penSetColorEntity) {
    return Some(
      createNom('pen_setPenColorToColor', {
        color: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penSetSaturationEntity) {
    return Some(
      createNom('pen_setPenColorParamTo', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'saturation',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penSetBrightnessEntity) {
    return Some(
      createNom('pen_setPenColorParamTo', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'birghtness',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penSetTransparencyEntity) {
    return Some(
      createNom('pen_setPenColorParamTo', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'transparency',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penChangeColorEntity) {
    return Some(
      createNom('pen_changePenColorParamBy', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'color',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penChangeSaturationEntity) {
    return Some(
      createNom('pen_changePenColorParamBy', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'saturation',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penChangeBrightnessEntity) {
    return Some(
      createNom('pen_changePenColorParamBy', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'birghtness',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penSetTransparencyEntity) {
    return Some(
      createNom('pen_changePenColorParamBy', {
        colorParam: createNom('pen_menu_colorParam', {
          colorParam: 'transparency',
        }),
        value: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penChangeSizeByEntity) {
    return Some(
      createNom('pen_changePenSizeBy', {
        size: compileExpr(c, args[0]),
      })
    )
  }

  if (fn === penSetSizeEntity) {
    return Some(
      createNom('pen_setPenSizeTo', {
        size: compileExpr(c, args[0]),
      })
    )
  }

  return None()
}

// export const tryPenEntity = (c: CompileContext, entity: Entity): Opt<NOM> => {
//   return None()
// }
