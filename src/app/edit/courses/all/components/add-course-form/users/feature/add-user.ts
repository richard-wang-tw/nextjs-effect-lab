import { requestErrorOf } from '@/data/error/RequestError'
import { User, validateUser } from '@/data/user'
import * as Match from '@effect/match'
import axios from 'axios'
import { Effect, flow, pipe } from 'effect'
import { apply } from 'effect/Function'
import { UsersField, UsersFieldError } from '../data'

const getUser = (name: string): Effect.Effect<never, UsersFieldError, User> =>
  pipe(
    Effect.tryPromise({
      try: () => axios.get(`/api/v1/users/${name}`).then((res) => res.data),
      catch: (error) => requestErrorOf(error),
    }),
    Effect.flatMap(validateUser)
  )

const parseEvent = (event: unknown): 'Nothing' | 'AddUserEvent' =>
  pipe(
    Match.value(event),
    Match.when({ key: Match.string }, ({ key }) =>
      pipe(
        Match.value(key),
        Match.when('Enter', () => 'AddUserEvent' as const),
        Match.orElse(() => 'Nothing' as const)
      )
    ),
    Match.orElse(() => 'AddUserEvent' as const)
  )

const addUserToUserField = (field: UsersField) =>
  pipe(
    getUser(field.input),
    Effect.match({
      onFailure: flow(UsersField.updateError, apply(field)),
      onSuccess: flow(UsersField.addUser, apply(field)),
    })
  )

export const addUser =
  (event: unknown) =>
  (field: UsersField): Effect.Effect<never, 'Nothing', UsersField> =>
    pipe(
      Match.value(parseEvent(event)),
      Match.when('Nothing', () => Effect.fail('Nothing' as const)),
      Match.when('AddUserEvent', () => addUserToUserField(field)),
      Match.exhaustive
    )
