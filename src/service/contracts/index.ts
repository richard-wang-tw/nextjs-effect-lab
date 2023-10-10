import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { User } from '@/app/data/user'
import { Effect } from 'effect'
import { getUser } from './get-user'

export type GetUser = (name: string) => Effect.Effect<never, GetUserError, User>
export type GetUserError = ValidateError | RequestError

export interface Contracts {
  getUser: GetUser
}

export const contracts = {
  getUser,
}
