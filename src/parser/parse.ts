import { Node } from '@/ast'
import { Err, Ok, Result } from 'rs-enums'
import { ParserContext } from './context'
import { ParseError } from './error'
import { parseRoot } from './rules/root'

export const parse = (c: ParserContext): Result<Node, ParseError> => {
  try {
    const node = parseRoot(c)

    return Ok<Node, ParseError>(node)
  } catch (err) {
    if (err instanceof ParseError) {
      return Err(err)
    } else {
      throw err
    }
  }
}
