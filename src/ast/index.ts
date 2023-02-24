import { Span } from '@/span'
import { NodeKind } from './kinds'
import { Node } from './node'

export * from './kinds'
export * from './node'

export const createNode = (kind: NodeKind, span: Span): Node => {
  return {
    kind: kind,
    span,
  }
}
