import { Node } from '@/ast'
import { ParserListRule, ParserRule } from '@/parser/ParserRule'
import { parseTrigger } from '../triggers'
import { expectItemCostume } from './ItemCostume'
import { expectItemDef } from './ItemDef'
import { expectItemSound } from './ItemSound'

export const parseItem: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    KeywordCostume: () => expectItemCostume(c),
    KeywordSound: () => expectItemSound(c),
    KeywordDef: () => expectItemDef(c),
    _: () => parseTrigger(c),
  })
}

export const expectItemListBlock: ParserListRule = (c) => {
  const openToken = c.expectNext('OpenBrace')

  const items: Node[] = []
  let span = openToken.span

  while (!c.peek().kind.matches('CloseBrace')) {
    const node = parseItem(c)

    items.push(node)
    span = span.merged(node.span)
  }

  const closeToken = c.expectNext('CloseBrace')
  span = span.merged(closeToken.span)

  return [items, span]
}
