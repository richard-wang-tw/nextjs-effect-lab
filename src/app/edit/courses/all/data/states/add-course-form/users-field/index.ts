import { Nothing } from '@/app/data/events'
import { User } from '@/app/data/user'
import * as Match from '@effect/match'
import { Effect, Equal, Option, ReadonlyArray, pipe } from 'effect'
import { isNonEmptyArray } from 'effect/ReadonlyArray'

import { GetUserError, getUser } from '@/service/contracts/get-user'
import {
  AddUserEvent,
  DeleteUserEvent,
  UpdateInputEvent,
  UsersFieldEvent,
} from '../../../events/users-field-event'
import { InitialUsersField } from './initial'
import { InvalidUsersField } from './invalid'
import { ValidUsersField } from './valid'

const onUpdateInput =
  ({ input }: UpdateInputEvent) =>
  (field: UsersField) => {
    const { error } = field
    return pipe(
      Match.value(field),
      Match.tag('InitialUsersField', () =>
        InvalidUsersField.of({
          error,
          selected: [],
          input,
        })
      ),
      Match.orElse((field) => ({
        ...field,
        input,
      })),
      Effect.succeed
    )
  }

const updateError = (error: GetUserError) => (field: UsersField) =>
  pipe(
    Match.value(field),
    Match.tag('InitialUsersField', () =>
      InvalidUsersField.of({
        error: Option.some(error),
        selected: [],
        input: field.input,
      })
    ),
    Match.orElse((field) => ({
      ...field,
      error: Option.some(error),
    }))
  )

const addUser = (user: User) => (state: UsersField) => {
  const { selected } = state
  return ValidUsersField.of({
    selected: ReadonlyArray.append(user)(selected),
    input: '',
    error: Option.none(),
  })
}

const onDeleteUser = (event: DeleteUserEvent) => (field: UsersField) =>
  pipe(
    field.selected as readonly User[],
    ReadonlyArray.filter((user) => !Equal.equals(user, event.user)),
    (selected) =>
      isNonEmptyArray(selected)
        ? ValidUsersField.of({
            selected,
            input: field.input,
            error: field.error,
          })
        : InvalidUsersField.of({ ...field, selected: [] }),
    Effect.succeed
  )

const onAddUser = (_: AddUserEvent) => (field: UsersField) =>
  pipe(
    getUser(field.input),
    Effect.match({
      onFailure: (error) => updateError(error)(field),
      onSuccess: (user) => addUser(user)(field),
    })
  )

const onNothing = (_: Nothing) => (field: UsersField) => Effect.succeed(field)

const on: (
  event: UsersFieldEvent
) => (field: UsersField) => Effect.Effect<never, never, UsersField> = (event) =>
  pipe(
    Match.value(event),
    Match.when(Nothing.is, onNothing),
    Match.when(AddUserEvent.is, onAddUser),
    Match.when(DeleteUserEvent.is, onDeleteUser),
    Match.when(UpdateInputEvent.is, onUpdateInput),
    Match.exhaustive
  )

const init = InitialUsersField.self

export type UsersField = InitialUsersField | ValidUsersField | InvalidUsersField

export const UsersField = {
  on,
  init,
}
