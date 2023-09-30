import { NoError, noError } from '@/data/error/NoError'
import { RequestError } from '@/data/error/RequestError'
import { ValidateError } from '@/data/error/validateError'
import { User, Users } from '@/data/user'
import * as Match from '@effect/match'
import { Data, Equal, ReadonlyArray, pipe } from 'effect'
import { isNonEmptyArray } from 'effect/ReadonlyArray'
import { atom } from 'jotai'

const updateInput =
  (input: string) =>
  (field: UsersField): ValidUsersField | InvalidUsersField => {
    const { error } = field
    return pipe(
      Match.value(field),
      Match.tag('InitialUsersField', () =>
        ofInvalid({
          error,
          selected: [],
          input,
        })
      ),
      Match.orElse((field) => ({
        ...field,
        input,
      }))
    )
  }

const updateError =
  (error: UsersFieldError) =>
  (field: UsersField): ValidUsersField | InvalidUsersField => {
    const { input } = field
    return pipe(
      Match.value(field),
      Match.tag('InitialUsersField', () =>
        ofInvalid({
          error,
          selected: [],
          input,
        })
      ),
      Match.orElse((field) => ({
        ...field,
        error,
      }))
    )
  }

const addUser = (user: User) => (state: UsersField) => {
  const { selected } = state
  return ofValid({
    selected: ReadonlyArray.append(user)(selected),
    input: '',
    error: noError,
  })
}

const deleteUser = (user: User) => (field: UsersField) =>
  pipe(
    field.selected as User[],
    ReadonlyArray.filter((_user) => !Equal.equals(_user, user)),
    (selected) =>
      isNonEmptyArray(selected)
        ? ofValid({ ...field, selected })
        : ofInvalid({ ...field, selected: [] })
  )

export type UsersField = InitialUsersField | ValidUsersField | InvalidUsersField

interface InitialUsersField extends Data.Case {
  _tag: 'InitialUsersField'
  selected: []
  input: ''
  error: NoError
}

const init = Data.tagged<InitialUsersField>('InitialUsersField')({
  selected: [],
  input: '',
  error: noError,
})

interface ValidUsersField extends Data.Case {
  _tag: 'ValidUsersField'
  selected: Users
  input: string
  error: UsersFieldError
}

const ofValid = Data.tagged<ValidUsersField>('ValidUsersField')

interface InvalidUsersField extends Data.Case {
  _tag: 'InvalidUsersField'
  selected: []
  input: string
  error: UsersFieldError
}

const ofInvalid = Data.tagged<InvalidUsersField>('InvalidUsersField')

export type UsersFieldError = ValidateError | RequestError | NoError

export const usersFieldAtom = atom<UsersField>(init)

export const UsersField = {
  updateError,
  addUser,
  deleteUser,
  updateInput,
  init,
}
