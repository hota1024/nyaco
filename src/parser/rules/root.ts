import { createNode, NodeKind } from '@/ast'
import { Span } from '@/span'
import { ParseError } from '../error'
import { ParserRule } from '../ParserRule'
import { parseSectionList } from './sections'

export const parseRoot: ParserRule = (c) => {
  const [sections, span] = parseSectionList(c)

  if (!sections.find((s) => s.kind.matches('SectionStage'))) {
    throw new ParseError(`expected at least one stage section`, new Span(0, 0))
  }

  return createNode(
    NodeKind.Root({
      sections,
    }),
    span
  )
}
