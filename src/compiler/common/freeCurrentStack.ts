import { createNomList, NOM } from 'nyair'
import { createNom } from '@/nom/createNom'
import { CompileContext } from '../context'

export const freeCurrentStack = (c: CompileContext) => {
  const len = c.currentScope.getCurrentStackSize()
  const nomList: NOM[] = []

  if (!c.analyzeContext.isCreatedStacks) {
    return nomList
  }

  nomList.push(
    createNom('$proc_call', {
      name: c.analyzeContext.symbolStackFree,
      args: createNomList([createNom('$literal_number', { value: len })]),
    })
  )

  // nomList.push(
  //   createNom('control_repeat', {
  //     times: createNom('$literal_number', { value: len }),
  //     substack: createNomList([
  //       createNom('data_deleteoflist', {
  //         list: c.analyzeContext.symbolStack0,
  //         index: createNom('data_lengthoflist', {
  //           list: c.analyzeContext.symbolStack0,
  //         }),
  //       }),
  //     ]),
  //   })
  // )

  return nomList
}
