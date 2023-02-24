import { Node } from '@/ast'
import { Scope } from '@/scope'
import { createCoreScope } from '@/scope/core'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { List, Variable } from 'nyair'
import { AnalyzeContext } from './context'
import { AnalyzeError } from './error'
import { evalStaticExpr } from './evalStaticExpr'
import { analyzeItem } from './items'

export const analyzeSection = (c: AnalyzeContext, section: Node) => {
  section.kind.match({
    SectionUse({ path }) {
      c.resolveScopeEntity(path).match({
        Ok(value) {
          if (Array.isArray(value)) {
            for (const entity of value) {
              if (c.currentScope.get(entity.name).isSome()) {
                c.errors.push(
                  new AnalyzeError(
                    `duplicate entity of same name ${entity.name}`,
                    section.span
                  )
                )
                return
              }

              c.currentScope.add(entity)
            }
          } else {
            if (c.currentScope.get(value.name).isSome()) {
              c.errors.push(
                new AnalyzeError(
                  `duplicate entity of same name ${value.name}`,
                  section.span
                )
              )
              return
            }
            c.currentScope.add(value)
          }
        },
        Err: (error) => {
          c.errors.push(error)
        },
      })
    },
    SectionUseCore() {
      const entities = createCoreScope().entities.flatMap((entity) =>
        entity.kind.match({
          Scope(scope) {
            return scope.scope.entities
          },
          _() {
            return [entity]
          },
        })
      )

      entities.forEach((entity) => {
        if (c.currentScope.get(entity.name).isSome()) {
          c.errors.push(
            new AnalyzeError(
              `duplicate entity of same name ${entity.name}`,
              section.span
            )
          )
          return
        }
        c.currentScope.add(entity)
      })
    },
    SectionDeclVar(value) {
      const name = value.name.kind.expect('Ident')

      if (c.currentScope.get(name.ident).isSome()) {
        c.errors.push(
          new AnalyzeError(`${name.ident} is already declared`, value.name.span)
        )
        return
      }

      const variable: Variable = {
        name: name.ident,
        initialValue: evalStaticExpr(c, value.init),
      }
      c.globalVariables.push(variable)
      c.currentScope.add(createEntity(name.ident, EntityKind.Var({ variable })))
    },
    SectionDeclList(value) {
      const name = value.name.kind.expect('Ident')

      if (c.currentScope.get(name.ident).isSome()) {
        c.errors.push(
          new AnalyzeError(`${name.ident} is already declared`, value.name.span)
        )
        return
      }

      const initialValue = value.init.kind
        .expect('LitList')
        .items.map((item) => evalStaticExpr(c, item))

      const list: List = {
        name: name.ident,
        initialValue,
      }
      c.globalLists.push(list)
      c.currentScope.add(createEntity(name.ident, EntityKind.List({ list })))
    },
    SectionStage(value) {
      const parent = c.currentScope
      c.currentScope = new Scope(parent)

      value.items.forEach((item) => {
        analyzeItem(c, item)
      })

      c.currentScope = parent
    },
    SectionSprite(value) {
      const parent = c.currentScope
      c.currentScope = new Scope(parent)

      value.items.forEach((item) => {
        analyzeItem(c, item)
      })

      c.currentScope = parent
    },
    SectionBroadcast(value) {
      const name = value.name.kind.expect('LitStr').value
      if (c.broadcasts.has(name)) {
        c.errors.push(
          new AnalyzeError(
            `broadcast "${name}" is already exists`,
            value.name.span
          )
        )
      } else {
        c.broadcasts.add(name)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _: () => {},
  })
}
