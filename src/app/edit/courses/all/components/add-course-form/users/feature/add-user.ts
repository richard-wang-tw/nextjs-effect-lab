import { requestErrorOf } from '@/data/error/RequestError'
import { validateUser } from '@/data/user'
import * as Match from '@effect/match'
import axios from 'axios'
import { Effect, flow, pipe } from 'effect'
import { apply } from 'effect/Function'
import { UsersField } from '../data'

const getUser = (name: string) =>
  pipe(
    Effect.tryPromise({
      try: () => axios.get(`/api/v1/users/${name}`).then((res) => res.data),
      catch: (error) => requestErrorOf(error),
    }),
    Effect.flatMap(validateUser)
  )

const parseEvent = (event: unknown) =>
  pipe(
    Match.value(event),
    Match.when({ key: Match.string }, ({ key }) =>
      pipe(
        Match.value(key),
        Match.when('Enter', () => 'AddUserEvent' as const),
        Match.orElse(() => 'NotTargetEvent' as const)
      )
    ),
    Match.orElse(() => 'AddUserEvent' as const)
  )

export const addUser =
  (event: unknown) =>
  (field: UsersField): Effect.Effect<never, 'NotTargetEvent', UsersField> =>
    pipe(
      Match.value(parseEvent(event)),
      Match.when('NotTargetEvent', () =>
        Effect.fail('NotTargetEvent' as const)
      ),
      Match.when('AddUserEvent', () =>
        pipe(
          getUser(field.input),
          Effect.match({
            onFailure: flow(UsersField.updateError, apply(field)),
            onSuccess: flow(UsersField.addUser, apply(field)),
          })
        )
      ),
      Match.exhaustive
    )
