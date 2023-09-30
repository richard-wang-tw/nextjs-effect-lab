import { isAxiosError } from 'axios'
import { Data } from 'effect'

export type RequestError = UnexpectedRequestError | NotFoundError

interface UnexpectedRequestError extends Data.Case {
  _tag: 'UnexpectedRequestError'
  error: unknown
}
const unexpectedRequestErrorOf = (error: unknown) =>
  Data.tagged<UnexpectedRequestError>('UnexpectedRequestError')({ error })

interface NotFoundError extends Data.Case {
  _tag: 'NotFoundError'
}

const notFoundError = Data.tagged<NotFoundError>('NotFoundError')()

export const requestErrorOf = (error: unknown): RequestError =>
  isAxiosError(error) && error.response?.status === 404
    ? notFoundError
    : unexpectedRequestErrorOf(error)
