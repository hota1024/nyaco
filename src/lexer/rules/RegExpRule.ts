import { TokenKind } from '@/tokens'
import { Ok } from 'rs-enums'
import { LexerRule } from '../LexerRule'
import { TokenizeError } from '../TokenizeError'

/**
 * RegExpRule lexer rule.
 */
export class RegExpRule implements LexerRule {
  constructor(
    private readonly regexp: RegExp,
    private readonly kindFactory: (matches: RegExpMatchArray) => TokenKind
  ) {}

  apply(rest: string) {
    const matches = rest.match(this.regexp)

    if (!matches) {
      return
    }

    return {
      result: Ok<TokenKind, TokenizeError[]>(this.kindFactory(matches)),
      pos: matches[0].length,
    }
  }
}
