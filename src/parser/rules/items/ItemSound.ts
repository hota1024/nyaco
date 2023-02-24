import { createNode, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { Span } from '@/span'
import { expectLitStr } from '../common/literals'

export const expectItemSound: ParserRule = (c) => {
  const soundToken = c.expectNext('KeywordSound')

  const name = expectLitStr(c)
  const path = expectLitStr(c)
  const span = Span.merge([soundToken.span, name.span, path.span])

  return createNode(NodeKind.ItemSound({ name, path }), span)
}
