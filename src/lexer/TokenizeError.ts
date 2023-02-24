import { Span } from '@/span'

export class TokenizeError extends Error {
  constructor(message: string, public span: Span) {
    super(message)
  }
}
