import { createNode, Node, NodeKind } from '@/ast'
import { ParserRule } from '@/parser/ParserRule'
import { parseExpr } from '../expr'

export const expectLitNum: ParserRule = (c) => {
  const t = c.expectNext('LitNum')

  return createNode(NodeKind.LitNum(t.kind.takeVariantValue()), t.span)
}

export const expectLitStr: ParserRule = (c) => {
  const t = c.expectNext('LitStr')

  return createNode(NodeKind.LitStr(t.kind.takeVariantValue()), t.span)
}

export const expectLitBool: ParserRule = (c) => {
  const t = c.expectNext('LitBool')

  return createNode(NodeKind.LitBool(t.kind.takeVariantValue()), t.span)
}

export const expectLitColor: ParserRule = (c) => {
  const t = c.expectNext('LitColor')

  return createNode(NodeKind.LitColor(t.kind.takeVariantValue()), t.span)
}

export const expectLitList: ParserRule = (c) => {
  const openToken = c.expectNext('OpenBracket')
  const items: Node[] = []

  while (!c.peek().kind.matches('CloseBracket')) {
    const item = parseExpr(c)

    items.push(item)

    if (c.peek().kind.matches('Comma')) {
      c.expectNext('Comma')
    }
  }

  const closeToken = c.expectNext('CloseBracket')

  return createNode(
    NodeKind.LitList({ items }),
    openToken.span.merged(closeToken.span)
  )
}
