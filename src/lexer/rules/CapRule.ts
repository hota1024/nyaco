import { Span } from '@/span'
import { TokenKind } from '@/tokens'
import { Err, Ok } from 'rs-enums'
import { LexerRule } from '../LexerRule'
import { TokenizeError } from '../TokenizeError'

/**
 * Cap type.
 */
export type Cap = {
  start: string
  end: string
  escapeChars: string[]
}

/**
 * CapRule lexer rule.
 */
export class CapRule implements LexerRule {
  constructor(
    private readonly caps: Cap[],
    private readonly kindFactory: (value: string) => TokenKind
  ) {}

  apply(rest: string, startPos: number) {
    const cap = this.caps.find((c) => rest.startsWith(c.start))
    const errors: TokenizeError[] = []

    if (!cap) {
      return
    }

    let escape = false
    let value = ''
    let pos = cap.start.length

    while (true as const) {
      if (pos >= rest.length) {
        errors.push(
          new TokenizeError(
            'unterminated string',
            new Span(startPos, startPos + pos)
          )
        )
        break
      }

      if (!escape && rest[pos] === cap.end) {
        pos += 1
        break
      }

      if (rest[pos] === '\n') {
        errors.push(
          new TokenizeError(
            'unterminated string',
            new Span(startPos, startPos + pos)
          )
        )
        break
      }

      if (!escape && cap.escapeChars.includes(rest[pos])) {
        escape = true
      } else {
        value += rest[pos]
        escape = false
      }

      pos += 1
    }

    return {
      result:
        errors.length > 0
          ? Err<TokenKind, TokenizeError[]>(errors)
          : Ok<TokenKind, TokenizeError[]>(this.kindFactory(value)),
      pos,
    }
  }
}
