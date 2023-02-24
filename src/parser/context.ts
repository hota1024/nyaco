import { Node } from '@/ast'
import { Token, TokenKindVariants } from '@/tokens'
import { ParseError } from './error'

export class ParserContext {
  private cursor = -1
  public readonly identPathNodes: Node[] = []
  public readonly callNodes: Node[] = []

  constructor(private readonly tokens: Token[]) {}

  current() {
    return this.tokens[this.cursor]
  }

  peek() {
    return this.tokens[this.cursor + 1]
  }

  next(steps = 1) {
    this.cursor += steps

    return this.current()
  }

  expectNext<K extends keyof TokenKindVariants>(kind: K): Token<K> {
    const next = this.next()

    if (next.kind.matches(kind)) {
      return next as Token<K>
    }

    throw new ParseError(
      `expected ${kind} but got \`${next.literal}(${next.kind.getVariant()})\``,
      next.span
    )
  }

  expectNextIdent(ident: string | string[]): Token<'Ident'> {
    const token = this.expectNext('Ident')

    if (typeof ident === 'string') {
      if (token.literal !== ident) {
        throw new ParseError(
          `expected \`${ident}\` but got \`${token.literal}\``,
          token.span
        )
      }
    } else {
      if (!ident.includes(token.literal)) {
        throw new ParseError(
          `expected one of \`${ident.join('`, `')}\` but got \`${
            token.literal
          }\``,
          token.span
        )
      }
    }

    return token
  }
}
