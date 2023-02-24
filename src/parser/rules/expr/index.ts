import { ParserRule } from '@/parser/ParserRule'
import { parseExprAssign } from './ExprAssign'

export const parseExpr: ParserRule = (c) => parseExprAssign(c)
