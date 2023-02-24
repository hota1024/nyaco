/* eslint-disable @typescript-eslint/no-empty-function */
import { Node } from '@/ast'
import { Scope } from '@/scope'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { AnalyzeContext } from './context'
import { AnalyzeError } from './error'
import { analyzeExpr } from './exprs'
import { analyzeStmtList } from './stmts'

export const analyzeItem = (c: AnalyzeContext, item: Node) => {
  item.kind.match({
    ItemDef(value) {
      const name = value.name.kind.expect('Ident').ident

      if (c.currentScope.get(name).isSome()) {
        c.errors.push(
          new AnalyzeError(`${name} is already defined`, value.name.span)
        )
      } else {
        c.currentScope.add(
          createEntity(
            name,
            EntityKind.Proc({
              name,
              args: value.args.map((arg) => ({
                name: arg.kind.expect('DefArg').name.kind.expect('Ident').ident,
                ty: arg.kind.expect('DefArg').ty,
              })),
            })
          )
        )
      }

      const parent = c.currentScope
      const scope = new Scope(parent)

      for (const arg of value.args) {
        const argNode = arg.kind.expect('DefArg')
        scope.add(
          createEntity(
            argNode.name.kind.expect('Ident').ident,
            EntityKind.ProcParam({
              name: argNode.name.kind.expect('Ident').ident,
              ty: argNode.ty,
            })
          )
        )
      }

      c.currentScope = scope

      analyzeStmtList(c, value.body)

      c.currentScope = parent
    },
    TriggerWhenBackdropSwitches(value) {
      analyzeStmtList(c, value.body)
    },
    TriggerWhenClicked(value) {
      analyzeStmtList(c, value.body)
    },
    TriggerWhenFlagClicked(value) {
      analyzeStmtList(c, value.body)
    },
    TriggerWhenGreaterThan(value) {
      analyzeExpr(c, value.value)
      analyzeStmtList(c, value.body)
    },
    TriggerWhenKeyPressed(value) {
      analyzeStmtList(c, value.body)
    },
    TriggerWhenReceive(value) {
      analyzeStmtList(c, value.body)
    },
    TriggerWhenStartAsClone(value) {
      analyzeStmtList(c, value.body)
    },
    _() {},
  })
}
