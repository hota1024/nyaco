import { promisify } from 'util'
import imageSize from 'image-size'

const sizeOf = promisify(imageSize)

export const getImageSize = async (path: string) => {
  const result = await sizeOf(path)

  if (result) {
    return result
  }

  throw new Error(`could not get size of ${path}`)
}
