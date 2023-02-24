/**
 * LoopCallback type.
 */
export type LoopCallback<T> = (props: { end: (value: T) => void }) => unknown

/**
 * Loop given callback.
 */
export const loop = <T>(callback: LoopCallback<T>): T => {
  let endFlag = false
  let result: T

  const end = (value: T) => {
    endFlag = true
    result = value
  }

  while (true as const) {
    callback({ end })
    if (endFlag) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return result!
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result!
}
