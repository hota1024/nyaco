/* eslint-disable @typescript-eslint/no-empty-function */
import { Node } from '@/ast'
import { Scope } from '@/scope'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { createNom, createNomList, NOM } from 'nyair'
import { freeCurrentStack } from '../common/freeCurrentStack'
import { CompileContext } from '../context'
import { CompileError } from '../error'
import { compileExpr } from '../expr'
import { compileStmtList } from '../stmts'

export const compileItem = (c: CompileContext, item: Node) => {
  const { kind } = item

  return kind.match({
    ItemDef(def) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const schema: any[] = [
        {
          type: 'label',
          text: def.name.kind.expect('Ident').ident,
        },
      ]
      schema.push(
        ...def.args.map((arg) => {
          const argNode = arg.kind.expect('DefArg')
          const name = argNode.name.kind.expect('Ident').ident

          if (argNode.ty.matches('Any')) {
            return {
              type: 'string_number',
              name,
            }
          } else if (argNode.ty.matches('Bool')) {
            return {
              type: 'boolean',
              name,
            }
          } else {
            throw new CompileError(
              `unsupported argument type: ${argNode.ty}`,
              arg.span
            )
          }
        })
      )

      c.currentScope.add(
        createEntity(
          def.name.kind.expect('Ident').ident,
          EntityKind.Proc({
            name: def.name.kind.expect('Ident').ident,
            args: def.args.map((arg) => ({
              name: arg.kind.expect('DefArg').name.kind.expect('Ident').ident,
              ty: arg.kind.expect('DefArg').ty,
            })),
          })
        )
      )

      const parent = c.currentScope
      const scope = new Scope(parent)

      for (const arg of def.args) {
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
      const body = compileStmtList(c, def.body)

      freeCurrentStack(c).forEach((block) => body.push(block))

      c.currentScope = parent

      return createNom('$proc_def', {
        name: def.name.kind.expect('Ident').ident,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        schema: schema as any,
        warp: def.warp,
        body,
      }) as NOM
    },
    TriggerWhenFlagClicked: ({ body }) =>
      createNom('event_whenflagclicked', {
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenKeyPressed: ({ key, body }) =>
      createNom('event_whenkeypressed', {
        key: key.kind.expect('LitStr').value,
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenClicked: ({ body }) =>
      createNom('event_whenthisspriteclicked', {
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenBackdropSwitches: ({ backdrop, body }) =>
      createNom('event_whenbackdropswitchesto', {
        backdrop: backdrop.kind.expect('LitStr').value,
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenGreaterThan: ({ target, value, body }) =>
      createNom('event_whengreaterthan', {
        target: target.kind.expect('LitStr').value as 'LOUDNESS' | 'TIMER',
        value: compileExpr(c, value),
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenReceive: ({ broadcast, body }) =>
      createNom('event_whenbroadcastreceived', {
        broadcast: broadcast.kind.expect('LitStr').value,
        body: compileStmtList(c, body),
      }) as NOM,
    TriggerWhenStartAsClone: ({ body }) =>
      createNom('control_start_as_clone', {
        body: compileStmtList(c, body),
      }) as NOM,
    _() {
      throw new CompileError(
        `unimplemented item \`${kind.getVariant()}\``,
        item.span
      )
    },
  })
}

export const compileItemList = (c: CompileContext, items: Node[]) => {
  const list: NOM[] = []

  for (const item of items) {
    const { kind } = item

    kind.match({
      ItemCostume: () => {},
      ItemSound: () => {},
      _: () => {
        list.push(compileItem(c, item))
      },
    })
  }

  return createNomList(list)
}
