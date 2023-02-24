import { tokenModifiers, tokenTypes } from '@/lsp/legend'
import { Entity } from '@/scope/Entity'
import { Span } from '@/span'
import { EnumNarrowSelector } from 'rs-enums'
import { TokenKind, TokenKindVariants } from './kinds'

export type Token<K extends EnumNarrowSelector<TokenKindVariants> = unknown> = {
  kind: TokenKind<K>
  span: Span
  literal: string
  meta?: {
    legendTokenType?: (typeof tokenTypes)[number]
    legendModifiers?: (typeof tokenModifiers)[]
    entity?: Entity
  }
}
