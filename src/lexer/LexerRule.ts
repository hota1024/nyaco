import { TokenKind } from '@/tokens'
import { Result } from 'rs-enums'
import { TokenizeError } from './TokenizeError'

export type LexerRuleApplyResult = {
  result: Result<TokenKind, TokenizeError[]>
  pos: number
}

export interface LexerRule {
  apply(rest: string, currentPos: number): LexerRuleApplyResult | void
}
