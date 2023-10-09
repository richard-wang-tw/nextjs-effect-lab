import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class DatabaseUnexpectedError extends S.Class<DatabaseUnexpectedError>()(
  {
    _tag: S.literal('DatabaseUnexpectedError'),
    error: S.string,
    action: S.string,
    model: S.string,
  }
) {
  static of = Data.tagged<DatabaseUnexpectedError>('DatabaseUnexpectedError')
}

export class DatabaseNotFoundError extends S.Class<DatabaseNotFoundError>()({
  _tag: S.literal('DatabaseNotFoundError'),
  action: S.string,
  model: S.string,
}) {
  static of = Data.tagged<DatabaseNotFoundError>('DatabaseNotFoundError')
}

const schema = S.union(DatabaseUnexpectedError, DatabaseNotFoundError)

export type DatabaseError = S.Schema.To<typeof schema>

export const DatabaseError = {
  schema,
}
