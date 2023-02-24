import { Span } from '@/span'

export class AnalyzeError extends Error {
  constructor(message: string, public readonly span: Span) {
    super(message)
  }
}
