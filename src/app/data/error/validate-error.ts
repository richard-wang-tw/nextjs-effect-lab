import { ParseError } from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'
import { formatErrors } from '@effect/schema/TreeFormatter'

export class ValidateError extends S.Class<ValidateError>()({
  _tag: S.literal('ValidateError'),
  error: S.unknown,
  message: S.string,
}) {
  static of(error: ParseError) {
    return new ValidateError({
      _tag: 'ValidateError',
      error,
      message: formatErrors(error.errors),
    })
  }
}
