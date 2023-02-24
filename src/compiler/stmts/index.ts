import { Node } from '@/ast'
import { createNom, createNomList, InputNodeOf, NOM } from 'nyair'
import { CompileContext } from '../context'
import { CompileError } from '../error'
import { compileExpr } from '../expr'

export const compileStmt = (c: CompileContext, node: Node) => {
  return node.kind.match({
    StmtRep(value) {
      return createNom('control_repeat', {
        times: compileExpr(c, value.count),
        substack: compileStmtList(c, value.body),
      }) as NOM
    },
    StmtForever(value) {
      return createNom('control_forever', {
        substack: compileStmtList(c, value.body),
      }) as NOM
    },
    StmtIf(value): NOM {
      const condition = compileExpr(c, value.condition) as NOM<
        InputNodeOf<boolean>
      >
      const substack = compileStmtList(c, value.body)
      if (value.elseBody) {
        if (Array.isArray(value.elseBody)) {
          // else {...}
          return createNom('control_if_else', {
            condition,
            substack1: substack,
            substack2: compileStmtList(c, value.elseBody),
          }) as NOM
        } else {
          // else if {...}
          return createNom('control_if_else', {
            condition,
            substack1: substack,
            substack2: createNomList([compileStmt(c, value.elseBody)]),
          }) as NOM
        }
      } else {
        return createNom('control_if', {
          condition,
          substack,
        }) as NOM
      }
    },
    StmtUntil(value) {
      return createNom('control_repeat_until', {
        condition: compileExpr(c, value.condition) as NOM<InputNodeOf<boolean>>,
        substack: compileStmtList(c, value.body),
      }) as NOM
    },
    StmtWhile(value) {
      return createNom('control_repeat_until', {
        condition: createNom('operator_not', {
          operand: compileExpr(c, value.condition) as NOM<InputNodeOf<boolean>>,
        }),
        substack: compileStmtList(c, value.body),
      }) as NOM
    },
    StmtSemi(value) {
      return compileExpr(c, value.expr) as NOM
    },
    _: () => {
      throw new CompileError(
        `unimplemented statement \`${node.kind.getVariant()}\``,
        node.span
      )
    },
  })
}

export const compileStmtList = (c: CompileContext, nodes: Node[]) => {
  const list: NOM[] = []

  for (const node of nodes) {
    list.push(compileStmt(c, node))
  }

  return createNomList(list)
}
