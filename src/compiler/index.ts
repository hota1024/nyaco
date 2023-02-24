import { Node } from '@/ast'
import { NOMList } from 'nyair'
import { Err, Ok, Result } from 'rs-enums'
import { CompileContext } from './context'
import { CompileError } from './error'
import { compileItemList } from './items'

export const compile = (
  c: CompileContext,
  items: Node[]
): Result<NOMList, CompileError> => {
  try {
    const list = compileItemList(c, items)

    return Ok(list)
  } catch (err) {
    if (err instanceof CompileError) {
      return Err(err)
    } else {
      throw err
    }
  }
}
