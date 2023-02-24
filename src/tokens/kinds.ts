import { Enum, EnumNarrowSelector } from 'rs-enums'

export type TokenKindVariants = {
  InlineComment: null

  Ident: null
  LitStr: string
  LitNum: number
  LitBool: boolean
  LitColor: string

  KeywordStage: null // stage
  KeywordSprite: null // sprite
  KeywordCostume: null // costume
  KeywordSound: null // sound
  KeywordBroadcast: null // broadcast
  KeywordFn: null // fn
  KeywordDef: null // def
  KeywordWarp: null // warp
  KeywordReturn: null // return
  KeywordVar: null // var
  KeywordList: null // list
  KeywordUse: null // use
  KeywordUseCore: null // use_core

  KeywordWhenFlagClicked: null // when_flag_clicked
  KeywordWhenKeyPressed: null // when_key_pressed
  KeywordWhenBackdropSwitches: null // when_backdrop_switches
  KeywordWhenGreaterThan: null // when_greater_than
  KeywordWhenClicked: null // when_clicked
  KeywordWhenStartAsClone: null // when_start_as_clone
  KeywordWhenReceive: null // when_receive

  KeywordRep: null // rep
  KeywordIf: null // if
  KeywordElse: null // else
  KeywordForever: null // loop
  KeywordUntil: null // until
  KeywordWhile: null // while

  TyAny: null // any
  TyBool: null // bool

  OpenParen: null // (
  CloseParen: null // )
  OpenBracket: null // [
  CloseBracket: null // ]
  OpenBrace: null // {
  CloseBrace: null // }

  Dot: null // .
  Comma: null // ,
  Colon: null // :
  ColonColon: null // ::
  Semi: null // ;
  Plus: null // +
  Minus: null // -
  Star: null // *
  Slash: null // /
  Percent: null // %
  Eq: null // =
  EqEq: null // ==
  Not: null // !
  NotEq: null // !=
  Lt: null // <
  LtEq: null // <=
  Gt: null // >
  GtEq: null // >=
  BarBar: null // ||
  AndAnd: null // &&
  And: null // &
  Question: null // ?
  Exclamation: null // !

  EOF: null // end of file
}

const makeFactory =
  <K extends keyof TokenKindVariants>(kind: K) =>
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new TokenKind(kind, null as any)

export class TokenKind<
  K extends EnumNarrowSelector<TokenKindVariants> = unknown
> extends Enum<TokenKindVariants, K> {
  // statics
  static InlineComment = makeFactory('InlineComment')

  static Ident = makeFactory('Ident')

  // literals
  static LitStr = (value: string) => new TokenKind('LitStr', value)
  static LitNum = (value: number) => new TokenKind('LitNum', value)
  static LitBool = (value: boolean) => new TokenKind('LitBool', value)
  static LitColor = (value: string) => new TokenKind('LitColor', value)

  // keywords
  static KeywordStage = makeFactory('KeywordStage')
  static KeywordSprite = makeFactory('KeywordSprite')
  static KeywordCostume = makeFactory('KeywordCostume')
  static KeywordSound = makeFactory('KeywordSound')
  static KeywordBroadcast = makeFactory('KeywordBroadcast')
  static KeywordFn = makeFactory('KeywordFn')
  static KeywordDef = makeFactory('KeywordDef')
  static KeywordWarp = makeFactory('KeywordWarp')
  static KeywordReturn = makeFactory('KeywordReturn')
  static KeywordVar = makeFactory('KeywordVar')
  static KeywordList = makeFactory('KeywordList')
  static KeywordUse = makeFactory('KeywordUse')
  static KeywordUseCore = makeFactory('KeywordUseCore')

  static KeywordWhenFlagClicked = makeFactory('KeywordWhenFlagClicked')
  static KeywordWhenKeyPressed = makeFactory('KeywordWhenKeyPressed')
  static KeywordWhenBackdropSwitches = makeFactory(
    'KeywordWhenBackdropSwitches'
  )
  static KeywordWhenGreaterThan = makeFactory('KeywordWhenGreaterThan')
  static KeywordWhenClicked = makeFactory('KeywordWhenClicked')
  static KeywordWhenStartAsClone = makeFactory('KeywordWhenStartAsClone')
  static KeywordWhenReceive = makeFactory('KeywordWhenReceive')

  static KeywordRep = makeFactory('KeywordRep')
  static KeywordIf = makeFactory('KeywordIf')
  static KeywordElse = makeFactory('KeywordElse')
  static KeywordForever = makeFactory('KeywordForever')
  static KeywordUntil = makeFactory('KeywordUntil')
  static KeywordWhile = makeFactory('KeywordWhile')

  // types
  static TyAny = makeFactory('TyAny')
  static TyBool = makeFactory('TyBool')

  static OpenParen = makeFactory('OpenParen')
  static CloseParen = makeFactory('CloseParen')
  static OpenBracket = makeFactory('OpenBracket')
  static CloseBracket = makeFactory('CloseBracket')
  static OpenBrace = makeFactory('OpenBrace')
  static CloseBrace = makeFactory('CloseBrace')

  // symbols
  static Semi = makeFactory('Semi')

  // ops
  static Dot = makeFactory('Dot')
  static Comma = makeFactory('Comma')
  static Colon = makeFactory('Colon')
  static ColonColon = makeFactory('ColonColon')
  static Plus = makeFactory('Plus')
  static Minus = makeFactory('Minus')
  static Star = makeFactory('Star')
  static Slash = makeFactory('Slash')
  static Percent = makeFactory('Percent')
  static Eq = makeFactory('Eq')
  static EqEq = makeFactory('EqEq')
  static Not = makeFactory('Not')
  static NotEq = makeFactory('NotEq')
  static Lt = makeFactory('Lt')
  static LtEq = makeFactory('LtEq')
  static Gt = makeFactory('Gt')
  static GtEq = makeFactory('GtEq')
  static BarBar = makeFactory('BarBar')
  static AndAnd = makeFactory('AndAnd')
  static And = makeFactory('And')
  static Question = makeFactory('Question')
  static Exclamation = makeFactory('Exclamation')

  static EOF = makeFactory('EOF')

  isKeyword() {
    const variant = this.getVariant()
    return typeof variant === 'string' && variant.startsWith('Keyword')
  }

  isType() {
    const variant = this.getVariant()
    return typeof variant === 'string' && variant.startsWith('Ty')
  }

  isOp() {
    return (
      this.matches('Dot') ||
      this.matches('Comma') ||
      this.matches('Colon') ||
      this.matches('ColonColon') ||
      this.matches('Semi') ||
      this.matches('Plus') ||
      this.matches('Minus') ||
      this.matches('Star') ||
      this.matches('Slash') ||
      this.matches('Percent') ||
      this.matches('Eq') ||
      this.matches('EqEq') ||
      this.matches('Not') ||
      this.matches('NotEq') ||
      this.matches('Lt') ||
      this.matches('LtEq') ||
      this.matches('Gt') ||
      this.matches('GtEq') ||
      this.matches('BarBar') ||
      this.matches('AndAnd') ||
      this.matches('And') ||
      this.matches('Question') ||
      this.matches('Exclamation')
    )
  }
}
