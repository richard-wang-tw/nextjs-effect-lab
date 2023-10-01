import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { Users } from '@/app/data/user'
import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class ValidUsersField extends S.Class<ValidUsersField>()({
  _tag: S.literal('ValidUsersField'),
  selected: Users.schema,
  input: S.string,
  error: S.option(S.union(ValidateError, RequestError.schema)),
}) {
  static of = Data.tagged<ValidUsersField>('ValidUsersField')
}
