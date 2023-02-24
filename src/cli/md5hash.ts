import * as crypto from 'crypto'

export const md5hash = (target: crypto.BinaryLike) => {
  const hash = crypto.createHash('md5')
  hash.update(target)

  return hash.digest('hex')
}
