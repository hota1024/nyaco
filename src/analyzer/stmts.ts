/* eslint-disable @typescript-eslint/no-empty-function */
import { Node } from '@/ast'
import { AnalyzeContext } from './context'
import { AnalyzeError } from './error'
import { analyzeExpr } from './exprs'
import { analyzeLet } from './let'

export const analyzeStmt = (c: AnalyzeContext, stmt: Node) => {
  stmt.kind.match({
    StmtSemi(value) {
      analyzeExpr(c, value.expr)
    },
    StmtRep(value) {
      analyzeExpr(c, value.count)
      analyzeStmtList(c, value.body)
    },
    StmtForever(value) {
      analyzeStmtList(c, value.body)
    },
    StmtIf(value) {
      const ty = analyzeExpr(c, value.condition)

      if (!ty.matches('Bool')) {
        c.errors.push(
          new AnalyzeError(`expected bool, got ${ty}`, value.condition.span)
        )
      }

      analyzeStmtList(c, value.body)
      const elseBody = value.elseBody
      if (elseBody) {
        if (Array.isArray(elseBody)) {
          analyzeStmtList(c, elseBody)
        } else {
          analyzeStmt(c, elseBody)
        }
      }
    },
    StmtUntil(value) {
      const ty = analyzeExpr(c, value.condition)

      if (!ty.matches('Bool')) {
        c.errors.push(
          new AnalyzeError(`expected bool, got ${ty}`, value.condition.span)
        )
      }

      analyzeStmtList(c, value.body)
    },
    StmtWhile(value) {
      const ty = analyzeExpr(c, value.condition)

      if (!ty.matches('Bool')) {
        c.errors.push(
          new AnalyzeError(`expected bool, got ${ty}`, value.condition.span)
        )
      }

      analyzeStmtList(c, value.body)
    },
    Let() {
      analyzeLet(c, stmt)
    },
    _() {},
  })
}

export const analyzeStmtList = (c: AnalyzeContext, stmts: Node[]) => {
  stmts.forEach((stmt) => {
    analyzeStmt(c, stmt)
  })
}
