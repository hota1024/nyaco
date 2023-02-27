import { Node } from '@/ast'
import { createEntity } from '@/scope/Entity'
import { EntityKind } from '@/scope/EntityKind'
import { AnalyzeContext } from './context'
import { analyzeExpr } from './exprs'

export const analyzeLet = (c: AnalyzeContext, letNode: Node) => {
  const node = letNode.kind.expect('Let')
  const name = node.name.kind.expect('Ident').ident

  if (node.init) {
    analyzeExpr(c, node.init)
  }

  c.createStacksIfNotExists()

  c.currentScope.add(
    createEntity(name, EntityKind.Let({ ty: node.ty, offset: -1 }))
  )
}
