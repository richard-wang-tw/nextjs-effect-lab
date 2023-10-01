import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { User } from '@/app/data/user'
import * as S from '@effect/schema/Schema'
import { Data, Option } from 'effect'

export class InitialUsersField extends S.Class<InitialUsersField>()({
  _tag: S.literal('InitialUsersField'),
  selected: S.array(User.schema),
  input: S.literal(''),
  error: S.option(S.union(ValidateError, RequestError.schema)),
}) {
  static self = Data.tagged<InitialUsersField>('InitialUsersField')({
    selected: [],
    input: '',
    error: Option.none(),
  })
}
