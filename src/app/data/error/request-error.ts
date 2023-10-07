import * as Match from '@effect/match'
import * as S from '@effect/schema/Schema'
import { isAxiosError } from 'axios'
import { Data, pipe } from 'effect'

export class UnexpectedAxiosError extends S.Class<UnexpectedAxiosError>()({
  _tag: S.literal('UnexpectedAxiosError'),
  error: S.unknown,
}) {
  static of = (error: unknown) =>
    Data.tagged<UnexpectedAxiosError>('UnexpectedAxiosError')({ error })
}

export class UnexpectedRequestError extends S.Class<UnexpectedRequestError>()({
  _tag: S.literal('UnexpectedRequestError'),
  error: S.unknown,
}) {
  static of = (error: unknown) =>
    Data.tagged<UnexpectedRequestError>('UnexpectedRequestError')({ error })
}

export class NotFoundError extends S.Class<NotFoundError>()({
  _tag: S.literal('NotFoundError'),
  error: S.unknown,
}) {
  static of = (error: unknown) =>
    Data.tagged<NotFoundError>('NotFoundError')({ error })
}

const of = (error: unknown): RequestError =>
  isAxiosError(error)
    ? pipe(
        Match.value(error.response?.status),
        Match.when(404, () => NotFoundError.of(error)),
        // Match.when(400, 401, 403, 500
        Match.orElse(() => UnexpectedAxiosError.of(error))
      )
    : UnexpectedRequestError.of(error)

const schema = S.union(
  UnexpectedAxiosError,
  UnexpectedRequestError,
  NotFoundError
)

export type RequestError = S.Schema.To<typeof schema>

export const RequestError = {
  of,
  schema,
}
