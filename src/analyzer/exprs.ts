import { Node } from '@/ast'
import { Ty } from '@/ty'
import { AnalyzeContext } from './context'
import { analyzeEntity } from './entity'
import { AnalyzeError } from './error'

export const analyzeExpr = (c: AnalyzeContext, expr: Node): Ty => {
  return expr.kind.match({
    ExprBin(value) {
      const { op } = value
      const left = analyzeExpr(c, value.left)
      const right = analyzeExpr(c, value.right)

      if (op.matches('AndAnd') || op.matches('Or')) {
        if (!left.matches('Bool')) {
          c.errors.push(
            new AnalyzeError(`expected bool, got ${left}`, value.left.span)
          )
        }
        if (!right.matches('Bool')) {
          c.errors.push(
            new AnalyzeError(`expected bool, got ${left}`, value.right.span)
          )
        }

        return Ty.Bool()
      }

      if (
        op.matches('EqEq') ||
        op.matches('NotEq') ||
        op.matches('Lt') ||
        op.matches('Lte') ||
        op.matches('Gt') ||
        op.matches('Gte')
      ) {
        return Ty.Bool()
      }

      return Ty.Num()
    },
    ExprUni(value) {
      const { op } = value
      const expr = analyzeExpr(c, value.expr)

      if (op.matches('Not')) {
        if (!expr.matches('Bool')) {
          c.errors.push(
            new AnalyzeError(`expected bool, got ${expr}`, value.expr.span)
          )
        }

        return Ty.Bool()
      }

      return Ty.Any()
    },
    ExprCall(value) {
      return c.resolveScopeEntity(value.fn).match({
        Ok(entity) {
          if (Array.isArray(entity)) {
            c.errors.push(
              new AnalyzeError(`cannot call multiple entities`, value.fn.span)
            )
            return Ty.Void()
          }

          return entity.kind.match({
            Fn(fn) {
              if (fn.args.length !== value.args.length) {
                c.errors.push(
                  new AnalyzeError(
                    `expected ${fn.args.length} argument(s), but got ${value.args.length} argument(s)`,
                    value.argsSpan
                  )
                )
              }
              const argTys = value.args.map(
                (arg) => [arg, analyzeExpr(c, arg)] as const
              )
              let i = 0
              for (const [arg, ty] of argTys) {
                if (!ty.isAssignableTo(fn.args[i].ty)) {
                  c.errors.push(
                    new AnalyzeError(
                      `expected ${fn.args[i].ty}, but got ${ty}`,
                      arg.span
                    )
                  )
                }

                i++
              }

              return fn.retTy
            },
            Proc(proc) {
              if (proc.args.length !== value.args.length) {
                c.errors.push(
                  new AnalyzeError(
                    `expected ${proc.args.length} argument(s), but got ${value.args.length} argument(s)`,
                    value.argsSpan
                  )
                )
              }
              const argTys = value.args.map(
                (arg) => [arg, analyzeExpr(c, arg)] as const
              )
              let i = 0
              for (const [arg, ty] of argTys) {
                if (!ty.isAssignableTo(proc.args[i].ty)) {
                  c.errors.push(
                    new AnalyzeError(
                      `expected ${proc.args[i].ty}, but got ${ty}`,
                      arg.span
                    )
                  )
                }

                i++
              }

              return Ty.Void()
            },
            _() {
              c.errors.push(
                new AnalyzeError(
                  `${entity.name} is not a function or procedure`,
                  value.fn.span
                )
              )
              return Ty.Void()
            },
          })
        },
        Err: (error) => {
          c.errors.push(error)
          return Ty.Void()
        },
      })
    },
    Ident() {
      return c.resolveScopeEntity(expr).match({
        Ok(entity) {
          if (Array.isArray(entity)) {
            c.errors.push(
              new AnalyzeError(`cannot use multiple entities`, expr.span)
            )

            return Ty.Never()
          }

          return analyzeEntity(c, expr, entity)
        },
        Err: (err) => {
          c.errors.push(err)

          return Ty.Never()
        },
      })
    },
    Path() {
      return c.resolveScopeEntity(expr).match({
        Ok(entity) {
          if (Array.isArray(entity)) {
            c.errors.push(
              new AnalyzeError(`cannot use multiple entities`, expr.span)
            )

            return Ty.Never()
          }

          return analyzeEntity(c, expr, entity)
        },
        Err: (err) => {
          c.errors.push(err)

          return Ty.Never()
        },
      })
    },
    LitStr() {
      return Ty.Str()
    },
    LitNum() {
      return Ty.Num()
    },
    LitBool() {
      return Ty.Bool()
    },
    LitColor() {
      return Ty.Color()
    },
    AndEntity(value) {
      const result = c.resolveScopeEntity(value.entity)

      return result.match({
        Ok(entity) {
          if (Array.isArray(entity)) {
            c.errors.push(
              new AnalyzeError(
                `cannot use multiple entities`,
                value.entity.span
              )
            )

            return Ty.Never()
          }

          return entity.kind.match({
            Var() {
              return Ty.EntityVar()
            },
            List() {
              return Ty.EntityList()
            },
            _() {
              return Ty.Never()
            },
          })
        },
        Err: (err) => {
          c.errors.push(err)
          return Ty.Never()
        },
      })
    },
    _() {
      return Ty.Never()
    },
  })
}
