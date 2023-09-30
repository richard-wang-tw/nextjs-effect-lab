import { Data } from 'effect'

export interface NoError extends Data.Case {
  _tag: 'NoError'
}
export const noError = Data.tagged<NoError>('NoError')()
