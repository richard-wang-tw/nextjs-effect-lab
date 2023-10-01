import * as S from '@effect/schema/Schema'
import { Data, Either, pipe } from 'effect'
import { TextInputEvent } from '../../events/text-input-event'

const validateMinLen =
  (minLen: number) =>
  (input: string): Either.Either<InvalidTextInput, string> =>
    input.length < minLen
      ? Either.left(
          InvalidTextInput.of({
            value: input,
            reason: `Input length should not less than ${minLen}`,
          })
        )
      : Either.right(input)

const validateMaxLen =
  (maxLen: number) =>
  (input: string): Either.Either<InvalidTextInput, string> =>
    input.length > maxLen
      ? Either.left(
          InvalidTextInput.of({
            value: input,
            reason: `Input length should not greater than ${maxLen}`,
          })
        )
      : Either.right(input)

const validateWhiteList = (
  input: string
): Either.Either<InvalidTextInput, string> =>
  /^[A-Za-z0-9\s]*$/.test(input)
    ? Either.right(input)
    : Either.left(
        InvalidTextInput.of({
          value: input,
          reason:
            'Input length should only includes english, number, and space',
        })
      )

export type TextInput = InitialTextInput | ValidTextInput | InvalidTextInput

export class InitialTextInput extends S.Class<InitialTextInput>()({
  _tag: S.literal('InitialTextInput'),
  value: S.literal(''),
}) {
  static self = Data.tagged<InitialTextInput>('InitialTextInput')({ value: '' })
}

export class ValidTextInput extends S.Class<ValidTextInput>()({
  _tag: S.literal('ValidTextInput'),
  value: S.string,
}) {
  static of = (value: string) =>
    Data.tagged<ValidTextInput>('ValidTextInput')({ value })
  static is = S.is(ValidTextInput.struct)
}

export class InvalidTextInput extends S.Class<InvalidTextInput>()({
  _tag: S.literal('InvalidTextInput'),
  value: S.string,
  reason: S.string,
}) {
  static of = Data.tagged<InvalidTextInput>('InvalidTextInput')
  static is = S.is(InvalidTextInput.struct)
}

export const on = (
  event: TextInputEvent
): InvalidTextInput | ValidTextInput => {
  const { value, limit } = event
  const { minLen, maxLen } = limit
  return pipe(
    value,
    validateMinLen(minLen),
    Either.flatMap(validateMaxLen(maxLen)),
    Either.flatMap(validateWhiteList),
    Either.map(ValidTextInput.of),
    Either.merge
  )
}

export const TextInput = { on }
