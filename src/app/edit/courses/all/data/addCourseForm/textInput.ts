import { Data, Either, pipe } from 'effect'

const validateMinLen = (minLen: number) => (input: string) =>
  input.length < minLen
    ? Either.left(
        ofInvalid({
          value: input,
          reason: 'course name length should not be empty',
        })
      )
    : Either.right(input)

const validateMaxLen = (maxLen: number) => (input: string) =>
  input.length > maxLen
    ? Either.left(
        ofInvalid({
          value: input,
          reason: 'course name length should not greater than 50',
        })
      )
    : Either.right(input)

const validateWhiteList = (input: string) =>
  /^[A-Za-z0-9\s]*$/.test(input)
    ? Either.right(input)
    : Either.left(
        ofInvalid({
          value: input,
          reason: 'course name should only includes english, number, and space',
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

export const textInputOf =
  ({ minLen, maxLen }: { minLen: number; maxLen: number }) =>
  (input: string) =>
    pipe(
      input,
      validateMinLen(minLen),
      Either.flatMap(validateMaxLen(maxLen)),
      Either.flatMap(validateWhiteList),
      Either.mapRight(ofValid),
      Either.merge
    )
