import { Span } from '@/span'

export class CompileError extends Error {
  constructor(message: string, public span: Span) {
    super(message)
  }
}
