import { Node } from '@/ast'
import { AnalyzeContext } from './context'
import { analyzeSection } from './section'

export const analyze = (c: AnalyzeContext, root: Node) => {
  root.kind.match({
    Root(value) {
      for (const section of value.sections) {
        analyzeSection(c, section)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _: () => {},
  })
}
