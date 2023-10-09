import * as Match from '@effect/match'
import * as S from '@effect/schema/Schema'
import { isAxiosError } from 'axios'
import { Data, pipe } from 'effect'
import { Method } from '../utils/method'

export class UnexpectedAxiosError extends S.Class<UnexpectedAxiosError>()({
  _tag: S.literal('UnexpectedAxiosError'),
  method: Method.schema,
  url: S.string,
  error: S.unknown,
}) {
  static of = Data.tagged<UnexpectedAxiosError>('UnexpectedAxiosError')
}

export class UnexpectedRequestError extends S.Class<UnexpectedRequestError>()({
  _tag: S.literal('UnexpectedRequestError'),
  method: Method.schema,
  url: S.string,
  error: S.unknown,
}) {
  static of = Data.tagged<UnexpectedRequestError>('UnexpectedRequestError')
}

export class RequestNotFoundError extends S.Class<RequestNotFoundError>()({
  _tag: S.literal('RequestNotFoundError'),
  method: Method.schema,
  url: S.string,
  error: S.unknown,
}) {
  static of = Data.tagged<RequestNotFoundError>('RequestNotFoundError')
}

const of =
  (method: Method) =>
  (url: string) =>
  (error: unknown): RequestError =>
    isAxiosError(error)
      ? pipe(
          Match.value(error.response?.status),
          Match.when(404, () =>
            RequestNotFoundError.of({ error, method, url })
          ),
          // Match.when(400, 401, 403, 500
          Match.orElse(() => UnexpectedAxiosError.of({ error, method, url }))
        )
      : UnexpectedRequestError.of({ error, method, url })

const schema = S.union(
  UnexpectedAxiosError,
  UnexpectedRequestError,
  RequestNotFoundError
)

export type RequestError = S.Schema.To<typeof schema>

export const RequestError = {
  of,
  schema,
}
