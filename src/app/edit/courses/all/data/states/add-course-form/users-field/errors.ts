import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import * as S from '@effect/schema/Schema'

const schema = S.option(S.union(ValidateError, RequestError.schema))

export type UsersFieldError = S.Schema.To<typeof schema>

export const UsersFieldError = {
  schema,
}
