import { None, Opt, Some } from 'rs-enums'
import { Entity } from './Entity'

export class Scope {
  public readonly entities: Entity[] = []

  constructor(private parent?: Scope) {}

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
