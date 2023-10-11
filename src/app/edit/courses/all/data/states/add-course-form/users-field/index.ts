import { Nothing } from '@/app/data/events'
import { User } from '@/app/data/user'
import { Effect, Equal, Option, ReadonlyArray, pipe } from 'effect'
import { isNonEmptyArray } from 'effect/ReadonlyArray'

import { GetUserError } from '@/service/contracts'
import * as M from '@effect/match'
import { UserInputService } from '../../../../components/add-course-form/components/users-field/user-input'
import {
  AddUserEvent,
  DeleteUserEvent,
  UpdateInputEvent,
  UsersFieldEvent,
} from '../../../events/users-field-event'
import { InitialUsersField } from './initial'
import { InvalidUsersField } from './invalid'
import { ValidUsersField } from './valid'
const onUpdateInput = (event: UpdateInputEvent) =>
  pipe(
    UserInputService.context,
    Effect.map((service) => service.field),
    Effect.map((field) => {
      const { input } = event
      const { error } = field
      return pipe(
        M.value(field),
        M.tag('InitialUsersField', () =>
          InvalidUsersField.of({ error, selected: [], input })
        ),
        M.orElse((field): UsersField => ({ ...field, input }))
      )
    })
  )

const updateError = (error: GetUserError) =>
  pipe(
    UserInputService.context,
    Effect.map(
      ({ field }): UsersField =>
        pipe(
          M.value(field),
          M.tag('InitialUsersField', () =>
            InvalidUsersField.of({
              error: Option.some(error),
              selected: [],
              input: field.input,
            })
          ),
          M.orElse((field) => ({
            ...field,
            error: Option.some(error),
          }))
        )
    )
  )

const addUser = (user: User) =>
  pipe(
    UserInputService.context,
    Effect.map(({ field }) => field.selected),
    Effect.map((selected) => ReadonlyArray.append(user)(selected)),
    Effect.map((selected) =>
      ValidUsersField.of({
        selected,
        input: '',
        error: Option.none(),
      })
    )
  )

const onDeleteUser = (event: DeleteUserEvent) =>
  pipe(
    UserInputService.context,
    Effect.map((service) => service.field),
    Effect.map(({ selected, input, error }) =>
      pipe(
        selected as readonly User[],
        ReadonlyArray.filter((user) => !Equal.equals(user, event.user)),
        Option.liftPredicate(isNonEmptyArray),
        Option.match({
          onNone: () => InvalidUsersField.of({ input, error, selected: [] }),
          onSome: (selected) => ValidUsersField.of({ selected, input, error }),
        })
      )
    )
  )

const onAddUser = (
  _: AddUserEvent
): Effect.Effect<UserInputService, never, UsersField> => {
  return pipe(
    UserInputService.context,
    Effect.flatMap(({ getUser, field }) => getUser(field.input)),
    Effect.matchEffect({
      onFailure: updateError,
      onSuccess: addUser,
    })
  )
}

const onNothing = (_: Nothing) =>
  pipe(
    UserInputService.context,
    Effect.map((service) => service.field)
  )

const on: (
  event: UsersFieldEvent
) => Effect.Effect<UserInputService, never, UsersField> = (event) =>
  pipe(
    M.value(event),
    M.when(Nothing.is, onNothing),
    M.when(AddUserEvent.is, onAddUser),
    M.when(DeleteUserEvent.is, onDeleteUser),
    M.when(UpdateInputEvent.is, onUpdateInput),
    M.exhaustive
  )

const init = InitialUsersField.self

export type UsersField = InitialUsersField | ValidUsersField | InvalidUsersField

export const UsersField = {
  on,
  init,
}
