import { Node } from '@/ast'
import { Span } from '@/span'
import { ParserContext } from './context'

export type ParserRule = (c: ParserContext) => Node

export type ParserListRule = (c: ParserContext) => [Node[], Span]
