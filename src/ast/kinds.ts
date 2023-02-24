import { Span } from '@/span'
import { Token } from '@/tokens'
import { Ty } from '@/ty'
import { Enum, EnumNarrowSelector } from 'rs-enums'
import { Node } from './node'

export type BinOpKindVariants = {
  Eq: null
  EqEq: null
  NotEq: null
  AndAnd: null
  Or: null
  Lt: null
  Lte: null
  Gt: null
  Gte: null
  Add: null
  Minus: null
  Mul: null
  Div: null
  Mod: null
}
export class BinOpKind extends Enum<BinOpKindVariants> {
  static Eq = () => new BinOpKind('Eq', null)
  static EqEq = () => new BinOpKind('EqEq', null)
  static NotEq = () => new BinOpKind('NotEq', null)
  static Or = () => new BinOpKind('Or', null)
  static AndAnd = () => new BinOpKind('AndAnd', null)
  static Lt = () => new BinOpKind('Lt', null)
  static Lte = () => new BinOpKind('Lte', null)
  static Gt = () => new BinOpKind('Gt', null)
  static Gte = () => new BinOpKind('Gte', null)
  static Add = () => new BinOpKind('Add', null)
  static Minus = () => new BinOpKind('Minus', null)
  static Mul = () => new BinOpKind('Mul', null)
  static Div = () => new BinOpKind('Div', null)
  static Mod = () => new BinOpKind('Mod', null)
}

export type UniOpKindVariants = {
  Not: null
  Minus: null
}
export class UniOpKind extends Enum<UniOpKindVariants> {
  static Not = () => new UniOpKind('Not', null)
  static Minus = () => new UniOpKind('Minus', null)
}

export type NodeKindVariants = {
  Root: {
    sections: Node[]
  }

  // sections
  SectionStage: {
    items: Node[]
  }
  SectionSprite: {
    name: Node
    items: Node[]
  }
  SectionBroadcast: {
    name: Node
  }
  SectionUse: {
    path: Node
  }
  SectionUseCore: null
  SectionDeclVar: {
    name: Node
    init: Node
  }
  SectionDeclList: {
    name: Node
    init: Node
  }

  // items
  ItemCostume: {
    name: Node
    path: Node
  }
  ItemSound: {
    name: Node
    path: Node
  }
  ItemDef: {
    name: Node
    warp: boolean
    args: Node[]
    body: Node[]
  }
  DefArg: {
    name: Node
    ty: Ty
  }

  // triggers
  TriggerWhenFlagClicked: {
    body: Node[]
  }
  TriggerWhenKeyPressed: {
    key: Node
    body: Node[]
  }
  TriggerWhenClicked: {
    body: Node[]
  }
  TriggerWhenBackdropSwitches: {
    backdrop: Node
    body: Node[]
  }
  TriggerWhenGreaterThan: {
    target: Node
    value: Node
    body: Node[]
  }
  TriggerWhenReceive: {
    broadcast: Node
    body: Node[]
  }
  TriggerWhenStartAsClone: {
    body: Node[]
  }

  // statements
  StmtSemi: {
    expr: Node
  }
  StmtRep: {
    count: Node
    body: Node[]
  }
  StmtForever: {
    body: Node[]
  }
  StmtIf: {
    condition: Node
    body: Node[]
    elseBody?: Node | Node[]
  }
  StmtUntil: {
    condition: Node
    body: Node[]
  }
  StmtWhile: {
    condition: Node
    body: Node[]
  }

  // expressions
  ExprBin: {
    op: BinOpKind
    left: Node
    right: Node
  }
  ExprUni: {
    op: UniOpKind
    expr: Node
  }
  ExprCall: {
    fn: Node
    argsSpan: Span
    args: Node[]
  }

  // literals
  LitStr: {
    value: string
  }
  LitNum: {
    value: number
  }
  LitBool: {
    value: boolean
  }
  LitColor: {
    value: string
  }
  LitList: {
    items: Node[]
  }

  AndEntity: {
    entity: Node
  }
  Ident: {
    ident: string
    token: Token
  }
  Path: {
    segments: Node[]
  }
  PathWild: null
}

export class NodeKind<
  K extends EnumNarrowSelector<NodeKindVariants> = unknown
> extends Enum<NodeKindVariants, K> {
  static Root = (value: NodeKindVariants['Root']) => new NodeKind('Root', value)

  // sections
  static SectionStage = (value: NodeKindVariants['SectionStage']) =>
    new NodeKind('SectionStage', value)
  static SectionSprite = (value: NodeKindVariants['SectionSprite']) =>
    new NodeKind('SectionSprite', value)
  static SectionBroadcast = (value: NodeKindVariants['SectionBroadcast']) =>
    new NodeKind('SectionBroadcast', value)
  static SectionUse = (value: NodeKindVariants['SectionUse']) =>
    new NodeKind('SectionUse', value)
  static SectionUseCore = (value: NodeKindVariants['SectionUseCore']) =>
    new NodeKind('SectionUseCore', value)
  static SectionDeclVar = (value: NodeKindVariants['SectionDeclVar']) =>
    new NodeKind('SectionDeclVar', value)
  static SectionDeclList = (value: NodeKindVariants['SectionDeclList']) =>
    new NodeKind('SectionDeclList', value)

  // items
  static ItemCostume = (value: NodeKindVariants['ItemCostume']) =>
    new NodeKind('ItemCostume', value)
  static ItemSound = (value: NodeKindVariants['ItemSound']) =>
    new NodeKind('ItemSound', value)
  static ItemDef = (value: NodeKindVariants['ItemDef']) =>
    new NodeKind('ItemDef', value)

  static DefArg = (value: NodeKindVariants['DefArg']) =>
    new NodeKind('DefArg', value)

  // triggers
  static TriggerWhenFlagClicked = (
    value: NodeKindVariants['TriggerWhenFlagClicked']
  ) => new NodeKind('TriggerWhenFlagClicked', value)
  static TriggerWhenKeyPressed = (
    value: NodeKindVariants['TriggerWhenKeyPressed']
  ) => new NodeKind('TriggerWhenKeyPressed', value)
  static TriggerWhenClicked = (value: NodeKindVariants['TriggerWhenClicked']) =>
    new NodeKind('TriggerWhenClicked', value)
  static TriggerWhenBackdropSwitches = (
    value: NodeKindVariants['TriggerWhenBackdropSwitches']
  ) => new NodeKind('TriggerWhenBackdropSwitches', value)
  static TriggerWhenGreaterThan = (
    value: NodeKindVariants['TriggerWhenGreaterThan']
  ) => new NodeKind('TriggerWhenGreaterThan', value)
  static TriggerWhenReceive = (value: NodeKindVariants['TriggerWhenReceive']) =>
    new NodeKind('TriggerWhenReceive', value)
  static TriggerWhenStartAsClone = (
    value: NodeKindVariants['TriggerWhenStartAsClone']
  ) => new NodeKind('TriggerWhenStartAsClone', value)

  // statements
  static StmtSemi = (value: NodeKindVariants['StmtSemi']) =>
    new NodeKind('StmtSemi', value)
  static StmtRep = (value: NodeKindVariants['StmtRep']) =>
    new NodeKind('StmtRep', value)
  static StmtForever = (value: NodeKindVariants['StmtForever']) =>
    new NodeKind('StmtForever', value)
  static StmtIf = (value: NodeKindVariants['StmtIf']) =>
    new NodeKind('StmtIf', value)
  static StmtUntil = (value: NodeKindVariants['StmtUntil']) =>
    new NodeKind('StmtUntil', value)
  static StmtWhile = (value: NodeKindVariants['StmtWhile']) =>
    new NodeKind('StmtWhile', value)

  // expressions
  static ExprBin = (value: NodeKindVariants['ExprBin']) =>
    new NodeKind('ExprBin', value)
  static ExprUni = (value: NodeKindVariants['ExprUni']) =>
    new NodeKind('ExprUni', value)
  static ExprCall = (value: NodeKindVariants['ExprCall']) =>
    new NodeKind('ExprCall', value)

  // literals
  static LitStr = (value: string) => new NodeKind('LitStr', { value })
  static LitNum = (value: number) => new NodeKind('LitNum', { value })
  static LitBool = (value: boolean) => new NodeKind('LitBool', { value })
  static LitColor = (value: string) => new NodeKind('LitColor', { value })
  static LitList = (value: NodeKindVariants['LitList']) =>
    new NodeKind('LitList', value)

  static AndEntity = (value: NodeKindVariants['AndEntity']) =>
    new NodeKind('AndEntity', value)
  static Ident = (value: NodeKindVariants['Ident']) =>
    new NodeKind('Ident', value)
  static Path = (value: Node[]) => new NodeKind('Path', { segments: value })
  static PathWild = () => new NodeKind('PathWild', null)

  expect<K extends keyof NodeKindVariants>(kind: K): NodeKindVariants[K] {
    if (this.matches(kind)) {
      return this.takeVariantValue() as unknown as NodeKindVariants[K]
    } else {
      throw new Error(`expected node ${kind}, got ${this.getVariant()}`)
    }
  }
}
