import { Span } from '@/span'

export class ParseError extends Error {
  constructor(message: string, public span: Span) {
    super(message)
  }
}
