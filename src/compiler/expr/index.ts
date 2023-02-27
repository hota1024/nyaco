import { Node } from '@/ast'
import { createNom, InputNodeOf, NOM } from 'nyair'
import { CompileContext } from '../context'
import { CompileError } from '../error'
import { compileCall } from './call'
import { compileEntity } from './entity'

type BooleanNOM = NOM<InputNodeOf<'boolean'>>

export const compileExpr = (c: CompileContext, node: Node): NOM => {
  return node.kind.match({
    ExprBin({ op, left, right }) {
      return op.match({
        Eq: () => {
          return left.kind.match({
            Deref({ index }) {
              return createNom('data_replaceitemoflist', {
                list: c.analyzeContext.symbolStack0,
                index: compileExpr(c, index),
                item: compileExpr(c, right),
              })
            },
            _() {
              const entity = c.resolveScopeEntity(left)
              return entity.kind.match({
                Let(value) {
                  return createNom('data_replaceitemoflist', {
                    list: c.analyzeContext.symbolStack0,
                    index: c.getUnitStackIndex(value.offset),
                    item: compileExpr(c, right),
                  })
                },
                _() {
                  throw new CompileError(
                    'left side must be variable',
                    left.span
                  )
                },
              })
            },
          })
        },
        EqEq: () =>
          createNom('operator_equals', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }) as NOM,
        NotEq: () =>
          createNom('operator_not', {
            operand: createNom('operator_equals', {
              operand1: compileExpr(c, left) as BooleanNOM,
              operand2: compileExpr(c, right) as BooleanNOM,
            }),
          }),
        AndAnd: () =>
          createNom('operator_and', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Or: () =>
          createNom('operator_or', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Lt: () =>
          createNom('operator_lt', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Lte: () =>
          createNom('operator_$lte', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Gt: () =>
          createNom('operator_gt', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Gte: () =>
          createNom('operator_$gte', {
            operand1: compileExpr(c, left) as BooleanNOM,
            operand2: compileExpr(c, right) as BooleanNOM,
          }),
        Add: () =>
          createNom('operator_add', {
            num1: compileExpr(c, left),
            num2: compileExpr(c, right),
          }),
        Minus: () =>
          createNom('operator_subtract', {
            num1: compileExpr(c, left),
            num2: compileExpr(c, right),
          }),
        Mul: () =>
          createNom('operator_multiply', {
            num1: compileExpr(c, left),
            num2: compileExpr(c, right),
          }),
        Div: () =>
          createNom('operator_divide', {
            num1: compileExpr(c, left),
            num2: compileExpr(c, right),
          }),
        Mod: () =>
          createNom('operator_mod', {
            num1: compileExpr(c, left),
            num2: compileExpr(c, right),
          }),
        _() {
          throw new CompileError(
            `unimplemented operator ${op.getVariant()}`,
            node.span
          )
        },
      })
    },
    ExprUni({ op, expr }) {
      return op.match({
        Not: () =>
          createNom('operator_not', {
            operand: compileExpr(c, expr) as BooleanNOM,
          }) as NOM,
        Minus: () =>
          createNom('operator_subtract', {
            num1: createNom('$literal_number', { value: 0 }),
            num2: compileExpr(c, expr),
          }) as NOM,
      })
    },
    LitStr({ value }) {
      return createNom('$literal_string', { value }) as NOM
    },
    LitNum({ value }) {
      return createNom('$literal_number', { value }) as NOM
    },
    LitBool({ value }) {
      return createNom('$literal_boolean', { value }) as NOM
    },
    LitColor({ value }) {
      return createNom('$literal_color', {
        value: value as `#${string}`,
      }) as NOM
    },
    ExprCall({ fn, args }) {
      const entity = c.resolveScopeEntity(fn)

      return entity.kind.match({
        Fn() {
          return compileCall(c, node, entity, args)
        },
        Proc() {
          return compileCall(c, node, entity, args)
        },
        _() {
          throw new CompileError(
            `\`${entity.name}\` is not a function or procedure`,
            node.span
          )
        },
      })
    },
    Ident() {
      const entity = c.resolveScopeEntity(node)

      return compileEntity(c, node, entity)
    },
    Path() {
      const entity = c.resolveScopeEntity(node)

      return compileEntity(c, node, entity)
    },
    AndEntity({ entity }) {
      const instance = c.resolveScopeEntity(entity)
      return instance.kind.match({
        Let(value) {
          return c.getUnitStackIndex(value.offset)
        },
        _() {
          throw new CompileError(`cannot get reference`, node.span)
        },
      })
    },
    Deref({ index }) {
      return createNom('data_itemoflist', {
        list: c.analyzeContext.symbolStack0,
        index: compileExpr(c, index),
      })
    },
    _: () => {
      throw new CompileError(
        `unimplemented expr ${node.kind.getVariant()}`,
        node.span
      )
    },
  })
}
