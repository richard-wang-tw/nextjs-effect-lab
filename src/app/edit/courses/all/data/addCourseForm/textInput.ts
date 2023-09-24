import { Data, Either, pipe } from 'effect'
import { atom } from 'jotai'
import { ChangeEvent } from 'react'

const validateMinLen =
  (minLen: number) =>
  (input: string): Either.Either<InvalidTextInput, string> =>
    input.length < minLen
      ? Either.left(
          ofInvalid({
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
          ofInvalid({
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
        ofInvalid({
          value: input,
          reason:
            'Input length should only includes english, number, and space',
        })
      )

const ofInvalid = Data.tagged<InvalidTextInput>('InvalidTextInput')

const ofValid = (input: string) =>
  Data.tagged<ValidTextInput>('ValidTextInput')({ value: input })

export type TextInput = InitialTextInput | ValidTextInput | InvalidTextInput

export interface InitialTextInput extends Data.Case {
  readonly _tag: 'InitialTextInput'
  readonly value: ''
}

export interface ValidTextInput extends Data.Case {
  readonly _tag: 'ValidTextInput'
  readonly value: string
}
export interface InvalidTextInput extends Data.Case {
  readonly _tag: 'InvalidTextInput'
  readonly value: string
  readonly reason: string
}

export interface TextInputLimit {
  minLen: number
  maxLen: number
}

export const InitialTextInput = Data.tagged<InitialTextInput>(
  'InitialTextInput'
)({ value: '' })

export const courseNameAtom = atom<TextInput>(InitialTextInput)
export const descriptionAtom = atom<TextInput>(InitialTextInput)

export const textInputOf =
  ({ minLen, maxLen }: TextInputLimit) =>
  (input: string): InvalidTextInput | ValidTextInput =>
    pipe(
      input,
      validateMinLen(minLen),
      Either.flatMap(validateMaxLen(maxLen)),
      Either.flatMap(validateWhiteList),
      Either.mapRight(ofValid),
      Either.merge
    )

export const textInputOfEvent =
  (limit: TextInputLimit) =>
  (event: ChangeEvent<HTMLInputElement>): InvalidTextInput | ValidTextInput =>
    textInputOf(limit)(event.target.value)
