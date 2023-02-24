import { createNode, NodeKind } from '@/ast'
import { TokenKind } from '@/tokens'
import { ParseError } from './error'
import { ParserRule } from './ParserRule'

export const expectIdent: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    Ident() {
      const identToken = c.expectNext('Ident')

      return createNode(
        NodeKind.Ident({
          ident: identToken.literal,
          token: identToken,
        }),
        identToken.span
      )
    },
    _() {
      if (peek.kind.isKeyword()) {
        peek.kind = TokenKind.Ident()

        return expectIdent(c)
      }

      throw new ParseError(`expected identifier`, peek.span)
    },
  })
}
