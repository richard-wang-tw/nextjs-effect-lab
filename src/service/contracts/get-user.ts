import { RequestError } from '@/app/data/error/request-error'
import { validateUser } from '@/app/data/user'
import axios from 'axios'
import { Effect, pipe } from 'effect'
import { GetUser } from '.'

export const getUser: GetUser = (base) => (name) =>
  pipe(
    `${base}/api/v1/users/${name}`,
    (url) =>
      Effect.tryPromise({
        try: () => axios.get(url).then((res) => res.data),
        catch: RequestError.of('GET')(url),
      }),
    Effect.flatMap(validateUser)
  )
