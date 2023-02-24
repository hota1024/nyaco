import { Span } from '@/span'
import { Token, TokenKind } from '@/tokens'
import { LexerRule } from './LexerRule'
import { CapRule } from './rules/CapRule'
import { RegExpRule } from './rules/RegExpRule'

class TokenizeError extends Error {
  constructor(message: string, public span: Span) {
    super(message)
  }
}

export class Lexer {
  private readonly rules: LexerRule[] = [
    // keywords
    // new RegExpRule(/(^stage)/, () => TokenKind.KeywordStage()),
    // new RegExpRule(/(^sprite)/, () => TokenKind.KeywordSprite()),
    // new RegExpRule(/(^costume)/, () => TokenKind.KeywordCostume()),
    // new RegExpRule(/(^fn)/, () => TokenKind.KeywordFn()),
    // new RegExpRule(/(^return)/, () => TokenKind.KeywordReturn()),
    // new RegExpRule(/(^var)/, () => TokenKind.KeywordVar()),
    // new RegExpRule(/(^list)/, () => TokenKind.KeywordList()),

    // new RegExpRule(/(^rep)/, () => TokenKind.KeywordRep()),
    // new RegExpRule(/(^if)/, () => TokenKind.KeywordIf()),
    // new RegExpRule(/(^else)/, () => TokenKind.KeywordElse()),
    // new RegExpRule(/(^forever)/, () => TokenKind.KeywordLoop()),
    // new RegExpRule(/(^until)/, () => TokenKind.KeywordUntil()),
    // new RegExpRule(/(^while)/, () => TokenKind.KeywordWhile()),

    new RegExpRule(/(^when_flag_clicked)/, () =>
      TokenKind.KeywordWhenFlagClicked()
    ),
    new RegExpRule(/(^when_key_pressed)/, () =>
      TokenKind.KeywordWhenKeyPressed()
    ),
    new RegExpRule(/(^when_backdrop_switches)/, () =>
      TokenKind.KeywordWhenBackdropSwitches()
    ),
    new RegExpRule(/(^when_greater_than)/, () =>
      TokenKind.KeywordWhenGreaterThan()
    ),
    new RegExpRule(/(^when_clicked)/, () => TokenKind.KeywordWhenClicked()),
    new RegExpRule(/(^when_start_as_clone)/, () =>
      TokenKind.KeywordWhenStartAsClone()
    ),
    new RegExpRule(/(^when_receive)/, () => TokenKind.KeywordWhenReceive()),

    // types
    new RegExpRule(/(^any)/, () => TokenKind.TyAny()),
    new RegExpRule(/(^bool)/, () => TokenKind.TyBool()),

    new RegExpRule(/(^\/\/.*)/, () => TokenKind.InlineComment()),

    new RegExpRule(/(^true)/, () => TokenKind.LitBool(true)),
    new RegExpRule(/(^false)/, () => TokenKind.LitBool(false)),
    new RegExpRule(/(^#[0-9a-fA-F]{6})/, (matches) =>
      TokenKind.LitColor(matches[0])
    ),
    new RegExpRule(/(^[0-9]+\.[0-9]+)/, (matches) =>
      TokenKind.LitNum(parseFloat(matches[0]))
    ),
    new RegExpRule(/(^[1-9][0-9]*)/, (matches) =>
      TokenKind.LitNum(parseInt(matches[0]))
    ),
    new RegExpRule(/(^0)/, (matches) => TokenKind.LitNum(parseInt(matches[0]))),
    new CapRule([{ start: '"', end: '"', escapeChars: ['\\'] }], (value) =>
      TokenKind.LitStr(value)
    ),

    new RegExpRule(/(^::)/, () => TokenKind.ColonColon()),
    new RegExpRule(/(^==)/, () => TokenKind.EqEq()),
    new RegExpRule(/(^!=)/, () => TokenKind.NotEq()),
    new RegExpRule(/(^<=)/, () => TokenKind.LtEq()),
    new RegExpRule(/(^>=)/, () => TokenKind.GtEq()),
    new RegExpRule(/(^&&)/, () => TokenKind.AndAnd()),
    new RegExpRule(/(^\|\|)/, () => TokenKind.BarBar()),

    new RegExpRule(/(^\()/, () => TokenKind.OpenParen()),
    new RegExpRule(/(^\))/, () => TokenKind.CloseParen()),
    new RegExpRule(/(^\[)/, () => TokenKind.OpenBracket()),
    new RegExpRule(/(^\])/, () => TokenKind.CloseBracket()),
    new RegExpRule(/(^\{)/u, () => TokenKind.OpenBrace()),
    new RegExpRule(/(^\})/u, () => TokenKind.CloseBrace()),

    new RegExpRule(/(^\.)/, () => TokenKind.Dot()),
    new RegExpRule(/(^,)/, () => TokenKind.Comma()),
    new RegExpRule(/(^:)/, () => TokenKind.Colon()),
    new RegExpRule(/(^;)/, () => TokenKind.Semi()),
    new RegExpRule(/(^=)/, () => TokenKind.Eq()),
    new RegExpRule(/(^!)/, () => TokenKind.Not()),
    new RegExpRule(/(^<)/, () => TokenKind.Lt()),
    new RegExpRule(/(^>)/, () => TokenKind.Gt()),
    new RegExpRule(/(^%)/, () => TokenKind.Percent()),
    new RegExpRule(/(^&)/, () => TokenKind.And()),
    new RegExpRule(/(^\+)/, () => TokenKind.Plus()),
    new RegExpRule(/(^-)/, () => TokenKind.Minus()),
    new RegExpRule(/(^\*)/, () => TokenKind.Star()),
    new RegExpRule(/(^\/)/, () => TokenKind.Slash()),
    new RegExpRule(/(^\?)/, () => TokenKind.Question()),
    new RegExpRule(/(^!)/, () => TokenKind.Exclamation()),

    // /[a-zA-Z$_@]|[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]|([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/u
    new RegExpRule(/^([a-zA-Z$@_][a-zA-Z0-9$@_]*)/, (matches) => {
      const ident = matches[0]

      if (ident === 'stage') {
        return TokenKind.KeywordStage()
      } else if (ident === 'sprite') {
        return TokenKind.KeywordSprite()
      } else if (ident === 'broadcast') {
        return TokenKind.KeywordBroadcast()
      } else if (ident === 'costume') {
        return TokenKind.KeywordCostume()
      } else if (ident === 'sound') {
        return TokenKind.KeywordSound()
      } else if (ident === 'fn') {
        return TokenKind.KeywordFn()
      } else if (ident === 'def') {
        return TokenKind.KeywordDef()
      } else if (ident === 'warp') {
        return TokenKind.KeywordWarp()
      } else if (ident === 'return') {
        return TokenKind.KeywordReturn()
      } else if (ident === 'var') {
        return TokenKind.KeywordVar()
      } else if (ident === 'list') {
        return TokenKind.KeywordList()
      } else if (ident === 'use') {
        return TokenKind.KeywordUse()
      } else if (ident === 'use_core') {
        return TokenKind.KeywordUseCore()
      } else if (ident === 'rep') {
        return TokenKind.KeywordRep()
      } else if (ident === 'if') {
        return TokenKind.KeywordIf()
      } else if (ident === 'else') {
        return TokenKind.KeywordElse()
      } else if (ident === 'forever') {
        return TokenKind.KeywordForever()
      } else if (ident === 'until') {
        return TokenKind.KeywordUntil()
      } else if (ident === 'while') {
        return TokenKind.KeywordWhile()
      }

      return TokenKind.Ident()
    }),
  ]

  tokenize(source: string): [Token[], TokenizeError[]] {
    const tokens: Token[] = []
    const errors: TokenizeError[] = []

    const whitespaces = [' ', '\t']
    const newlines = ['\r', '\n']

    let pos = 0

    while (true as const) {
      while (
        whitespaces.includes(source[pos]) ||
        newlines.includes(source[pos])
      ) {
        pos += 1
      }

      if (pos >= source.length) {
        break
      }

      let token: Token | null = null

      for (const rule of this.rules) {
        const result = rule.apply(source.slice(pos), pos)

        if (!result) {
          continue
        }

        pos += result.pos
        const span = new Span(pos - result.pos, pos)
        result.result.match({
          Ok(kind) {
            token = {
              kind: kind,
              literal: source.slice(span.start, span.end),
              span,
            }
          },
          Err(value) {
            errors.push(...value)
          },
        })
        break
      }

      if (token) {
        tokens.push(token)
      } else {
        errors.push(
          new TokenizeError(
            `unexpected '${source[pos]}'`,
            new Span(pos, pos + 1)
          )
        )
        pos += 1
      }
    }

    tokens.push({
      kind: TokenKind.EOF(),
      literal: '',
      span: new Span(pos, pos),
    })

    return [tokens, errors]
  }
}
