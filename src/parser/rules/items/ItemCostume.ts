import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { Span } from '@/span'
import { expectLitStr } from '../common/literals'

export const expectItemCostume: ParserRule = (c) => {
  const costumeToken = c.expectNext('KeywordCostume')

  const name = expectLitStr(c)
  const path = expectLitStr(c)
  const span = Span.merge([costumeToken.span, name.span, path.span])

  return createNode(NodeKind.ItemCostume({ name, path }), span)
}
