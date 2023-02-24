import { BinOpKind, createNode, NodeKind } from '@/ast'
import { loop } from '@/loop'
import { ParserContext } from '@/parser/context'
import { ParserRule } from '@/parser/ParserRule'
import { Opt } from 'rs-enums'

export const parseExprBin = (
  c: ParserContext,
  subParser: ParserRule,
  opParser: (c: ParserContext) => Opt<BinOpKind>
) => {
  let left = subParser(c)

  loop<void>(({ end }) => {
    const op = opParser(c)

    if (op.isNone()) {
      end()
      return
    }

    const right = subParser(c)

    left = createNode(
      NodeKind.ExprBin({
        op: op.unwrap(),
        left,
        right,
      }),
      left.span.merged(right.span)
    )
  })

  return left
}
