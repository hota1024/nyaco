export class Span {
  static merge(spans: Span[]): Span {
    return spans.reduce((acc, span) => acc.merged(span), new Span(0, 0))
  }

  constructor(public start: number, public end: number) {}

  merged(other: Span): Span {
    return new Span(
      Math.min(this.start, other.start),
      Math.max(this.end, other.end)
    )
  }
}
