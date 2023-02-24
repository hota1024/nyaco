import { createNode, Node, NodeKind } from '@/ast'
import { ParseError } from '@/parser/error'
import { expectIdent } from '@/parser/ident'
import { ParserListRule, ParserRule } from '@/parser/ParserRule'
import { Span } from '@/span'
import { parseAtom } from '../atom'
import { expectLitList, expectLitStr } from '../common/literals'
import { parseExpr } from '../expr'
import { expectItemListBlock } from '../items'

export const expectSectionUse: ParserRule = (c) => {
  const useToken = c.expectNext('KeywordUse')
  const path = parseAtom(c)

  if (!path.kind.matches('Path')) {
    throw new ParseError(`expect path`, path.span)
  }

  return createNode(
    NodeKind.SectionUse({ path }),
    useToken.span.merged(path.span)
  )
}

export const expectSectionUseCore: ParserRule = (c) => {
  const useCoreToken = c.expectNext('KeywordUseCore')

  return createNode(NodeKind.SectionUseCore(null), useCoreToken.span)
}

export const expectSectionSprite: ParserRule = (c) => {
  const stageToken = c.expectNext('KeywordSprite')
  const name = expectLitStr(c)
  const [items, span] = expectItemListBlock(c)

  if (!items.find((i) => i.kind.matches('ItemCostume'))) {
    throw new ParseError(`expected at least one costume item`, span)
  }

  return createNode(
    NodeKind.SectionSprite({ name, items }),
    stageToken.span.merged(span)
  )
}

export const expectSectionStage: ParserRule = (c) => {
  const stageToken = c.expectNext('KeywordStage')
  const [items, span] = expectItemListBlock(c)

  if (!items.find((i) => i.kind.matches('ItemCostume'))) {
    throw new ParseError(`expected at least one costume item`, span)
  }

  return createNode(
    NodeKind.SectionStage({ items }),
    stageToken.span.merged(span)
  )
}

export const expectSectionBroadcast: ParserRule = (c) => {
  const broadcastToken = c.expectNext('KeywordBroadcast')
  const name = expectLitStr(c)

  return createNode(
    NodeKind.SectionBroadcast({ name }),
    broadcastToken.span.merged(name.span)
  )
}

export const expectSectionDeclVar: ParserRule = (c) => {
  const varToken = c.expectNext('KeywordVar')
  const name = expectIdent(c)
  c.expectNext('Eq')
  const init = parseExpr(c)

  return createNode(
    NodeKind.SectionDeclVar({ name, init }),
    varToken.span.merged(init.span)
  )
}

export const expectSectionDeclList: ParserRule = (c) => {
  const listToken = c.expectNext('KeywordList')
  const name = expectIdent(c)
  c.expectNext('Eq')
  const init = expectLitList(c)

  return createNode(
    NodeKind.SectionDeclList({ name, init }),
    listToken.span.merged(init.span)
  )
}

export const parseSection: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    KeywordStage: () => expectSectionStage(c),
    KeywordSprite: () => expectSectionSprite(c),
    KeywordBroadcast: () => expectSectionBroadcast(c),
    KeywordUse: () => expectSectionUse(c),
    KeywordUseCore: () => expectSectionUseCore(c),
    KeywordVar: () => expectSectionDeclVar(c),
    KeywordList: () => expectSectionDeclList(c),
    _: () => {
      throw new ParseError(`expected section`, peek.span)
    },
  })
}

export const parseSectionList: ParserListRule = (c) => {
  const sections: Node[] = []
  let span = new Span(0, 0)

  while (!c.peek().kind.matches('EOF')) {
    const node = parseSection(c)
    sections.push(node)
    span = span.merged(node.span)
  }

  return [sections, span]
}
