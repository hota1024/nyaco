import { Enum } from 'rs-enums'

export type TyVariants = {
  Any: null
  Num: null
  Bool: null
  Str: null
  Color: null
  Void: null
  Never: null
  EntityVar: null
  EntityList: null
  Address: null
  Array: {
    ty: Ty
    size: number
  }
}

export class Ty extends Enum<TyVariants> {
  static Any = () => new Ty('Any', null)
  static Num = () => new Ty('Num', null)
  static Bool = () => new Ty('Bool', null)
  static Str = () => new Ty('Str', null)
  static Color = () => new Ty('Color', null)
  static Void = () => new Ty('Void', null)
  static Never = () => new Ty('Never', null)
  static EntityVar = () => new Ty('EntityVar', null)
  static EntityList = () => new Ty('EntityList', null)
  static Address = () => new Ty('Address', null)
  static Array = (data: TyVariants['Array']) => new Ty('Array', data)

  isAssignableTo(other: Ty): boolean {
    return other.match({
      Any: () => {
        return (
          !this.matches('Never') &&
          !this.matches('EntityVar') &&
          !this.matches('EntityList')
        )
      },
      Num: () => {
        return this.matches('Num') || this.matches('Address')
      },
      Bool: () => {
        return this.matches('Bool')
      },
      Str: () => {
        return this.matches('Str')
      },
      Color: () => {
        return this.matches('Color')
      },
      Void: () => {
        return this.matches('Void')
      },
      EntityVar: () => {
        return this.matches('EntityVar')
      },
      EntityList: () => {
        return this.matches('EntityList')
      },
      Address: () => {
        return this.matches('Address') || this.matches('Num')
      },
      Array: ({ ty, size }) => {
        return this.match({
          Array: (data) => data.ty.isAssignableTo(ty) && data.size === size,
          _: () => false,
        })
      },
      Never() {
        return false
      },
    })
  }

  size(): number {
    return this.match({
      Array: ({ ty, size }) => ty.size() * size,
      _: () => 1,
    })
  }

  toString() {
    return this.match({
      Any() {
        return 'any'
      },
      Num() {
        return 'num'
      },
      Bool() {
        return 'bool'
      },
      Str() {
        return 'str'
      },
      Color() {
        return 'color'
      },
      Void() {
        return 'void'
      },
      Never() {
        return 'never'
      },
      EntityVar() {
        return '&var'
      },
      EntityList() {
        return '&list'
      },
      Address() {
        return 'address'
      },
      Array({ ty, size }) {
        return `${ty}[${size}]`
      },
    })
  }
}
