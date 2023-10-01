import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { User, validateUser } from '@/app/data/user'
import axios from 'axios'
import { Effect, pipe } from 'effect'

export type GetUserError = ValidateError | RequestError

export const getUser = (
  name: string
): Effect.Effect<never, GetUserError, User> =>
  pipe(
    Effect.tryPromise({
      try: () => axios.get(`/api/v1/users/${name}`).then((res) => res.data),
      catch: (error) => RequestError.of(error),
    }),
    Effect.flatMap(validateUser)
  )
