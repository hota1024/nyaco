import { AudioContext } from 'web-audio-api'

export type AudioData = {
  rate: number
  sampleCount: number
}

export const decodeAudioData = (buffer: Buffer): Promise<AudioData> => {
  const ctx = new AudioContext()

  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(
      buffer.buffer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (audioBuffer: any) => {
        resolve({
          rate: audioBuffer.sampleRate,
          sampleCount: audioBuffer.length,
        })
      },
      (err: Error) => {
        reject(err)
      }
    )
  })
}
