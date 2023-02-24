import { Span } from '@/span'
import { NodeKind } from './kinds'

export type Node = {
  kind: NodeKind
  span: Span
}
