import * as S from '@effect/schema/Schema'
import { Data, Either, flow } from 'effect'
import { NonEmptyReadonlyArray } from 'effect/ReadonlyArray'
import { ValidateError } from './error/validate-error'

export class Administrator extends S.Class<Administrator>()({
  _tag: S.literal('Administrator'),
  name: S.string,
}) {
  static of = (name: string) =>
    Data.tagged<Administrator>('Administrator')({ name })
}

export class Participant extends S.Class<Participant>()({
  _tag: S.literal('Participant'),
  name: S.string,
}) {
  static of = (name: string) =>
    Data.tagged<Participant>('Participant')({ name })
}

const userSchema = S.union(Administrator, Participant)

const usersSchema = S.nonEmptyArray(userSchema)

export const validateUser: (
  props: unknown
) => Either.Either<ValidateError, User> = flow(
  S.parseEither(userSchema),
  Either.mapLeft(ValidateError.of)
)

export type User = Administrator | Participant

export const User = {
  schema: userSchema,
}

export interface Users extends NonEmptyReadonlyArray<User> {}

export const Users = {
  schema: usersSchema,
}
