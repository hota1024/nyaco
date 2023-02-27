import { Node } from '@/ast'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { createNom, createNomList, NOM } from 'nyair'
import { CompileContext } from '../context'
import { compileExpr } from '../expr'

export const compileLet = (c: CompileContext, letNode: Node): NOM => {
  const node = letNode.kind.expect('Let')
  const ident = node.name.kind.expect('Ident').ident
  const offset = c.currentScope.getCurrentStackSize()

  c.currentScope.add(
    createEntity(ident, EntityKind.Let({ ty: node.ty, offset: offset }))
  )

  return createNom('$proc_call', {
    name: c.analyzeContext.symbolStackAlloc,
    args: createNomList([
      createNom('$literal_number', { value: node.ty.size() }),
      node.init
        ? compileExpr(c, node.init)
        : createNom('$literal_string', { value: '' }),
    ]),
  })

  // return createNom('data_addtolist', {
  //   list: c.analyzeContext.symbolStack0,
  //   item: compileExpr(c, node.init),
  // })
}
