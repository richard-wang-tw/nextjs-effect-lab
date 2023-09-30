import * as S from '@effect/schema/Schema'

export class ValidateError extends S.Class<ValidateError>()({
  _tag: S.literal('ValidateError'),
  error: S.unknown,
}) {}

export const validateErrorOf = (error: unknown) =>
  new ValidateError({
    _tag: 'ValidateError',
    error,
  })
