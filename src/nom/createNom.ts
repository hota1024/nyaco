import { createNom as createNomPrimitive } from 'nyair'

export const createNom = (kind: string, data: any) => {
  return (createNomPrimitive as any)(kind, data)
}
