import { ParseError } from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'
import { formatErrors } from '@effect/schema/TreeFormatter'
import { Effect, pipe } from 'effect'

export class EnvError extends S.Class<EnvError>()({
  _tag: S.literal('EnvError'),
  error: S.string,
  message: S.string,
}) {
  static of(error: ParseError) {
    return new EnvError({
      _tag: 'EnvError',
      error: String(error),
      message: formatErrors(error.errors),
    })
  }
}

export class Env extends S.Class<Env>()({
  DB_URI: S.string,
}) {
  static of = (env: unknown) =>
    pipe(S.parse(Env)(env), Effect.mapError(EnvError.of))
}
