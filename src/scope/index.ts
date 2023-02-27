import { None, Opt, Some } from 'rs-enums'
import { Entity } from './Entity'

export class Scope {
  public readonly entities: Entity[] = []

  constructor(private parent?: Scope) {}

  getCurrentLetList() {
    return this.entities.filter((e) => e.kind.matches('Let'))
  }

  getCurrentStackSize() {
    let size = 0

    for (const entity of this.entities) {
      size += entity.kind.match({
        Let: ({ ty }) => ty.size(),
        _: () => 0,
      })
    }

    return size
  }

  getCurrent(name: string): Opt<Entity> {
    const entity = this.entities.find((entity) => entity.name === name)

    if (entity) {
      return Some(entity)
    }

    return None()
  }

  get(name: string): Opt<Entity> {
    const entity = this.entities.find((entity) => entity.name === name)

    if (entity) {
      return Some(entity)
    }

    if (this.parent) {
      return this.parent.get(name)
    }

    return None()
  }

  add(entity: Entity) {
    this.entities.push(entity)
  }

  setParent(parent: Scope) {
    this.parent = parent
  }
}
