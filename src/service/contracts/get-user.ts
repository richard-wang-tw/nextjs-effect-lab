import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { User, validateUser } from '@/app/data/user'
import axios from 'axios'
import { Effect, pipe } from 'effect'

export type GetUserError = ValidateError | RequestError

export type GetUser = (name: string) => Effect.Effect<never, GetUserError, User>

export const getUser: GetUser = (name) =>
  pipe(
    `/api/v1/users/${name}`,
    (url) =>
      Effect.tryPromise({
        try: () => axios.get(url).then((res) => res.data),
        catch: RequestError.of('GET')(url),
      }),
    Effect.flatMap(validateUser)
  )
