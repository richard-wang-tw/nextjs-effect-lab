import * as S from '@effect/schema/Schema'
import { Either, flow } from 'effect'
import { NonEmptyReadonlyArray } from 'effect/ReadonlyArray'
import { ValidateError, validateErrorOf } from './error/validateError'

class Administrator extends S.Class<Administrator>()({
  _tag: S.literal('Administrator'),
  name: S.string,
}) {}

class Participant extends S.Class<Participant>()({
  _tag: S.literal('Participant'),
  name: S.string,
}) {}

const userSchema = S.union(Administrator, Participant)

export const validateUser: (
  props: unknown
) => Either.Either<ValidateError, User> = flow(
  S.parseEither(userSchema),
  Either.mapLeft(validateErrorOf)
)

export type User = Administrator | Participant

export interface Users extends NonEmptyReadonlyArray<User> {}
