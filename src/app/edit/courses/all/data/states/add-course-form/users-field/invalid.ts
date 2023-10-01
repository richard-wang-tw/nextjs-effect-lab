import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import * as S from '@effect/schema/Schema'
import { Data, Option } from 'effect'

export class InvalidUsersField extends S.Class<InvalidUsersField>()({
  _tag: S.literal('InvalidUsersField'),
  selected: S.array(S.never),
  input: S.string,
  error: S.option(S.union(ValidateError, RequestError.schema)),
}) {
  static of = Data.tagged<InvalidUsersField>('InvalidUsersField')

  static ofInput = (input: string) =>
    Data.tagged<InvalidUsersField>('InvalidUsersField')({
      selected: [],
      input,
      error: Option.none(),
    })
}
