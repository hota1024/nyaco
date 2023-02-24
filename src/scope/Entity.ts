import { Node } from '@/ast'
import { EntityKind } from './EntityKind'

export type Entity = {
  name: string
  node?: Node
  description?: string
  kind: EntityKind
}

export const createEntity = (
  name: string,
  kind: EntityKind,
  data: Partial<Entity> = {}
): Entity => ({
  name,
  kind,
  ...data,
})
