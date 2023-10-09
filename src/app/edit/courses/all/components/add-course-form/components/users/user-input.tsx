import { constantsAtom } from '@/app/atoms'
import { Button } from '@/app/components/button'
import { Nothing } from '@/app/data/events'
import { SetAtom } from '@/app/data/utils/hooks'
import * as M from '@effect/match'
import { Effect, Option, pipe } from 'effect'
import { apply } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react'
import {
  AddUserEvent,
  UpdateInputEvent,
} from '../../../../data/events/users-field-event'
import { UsersField } from '../../../../data/states/add-course-form/users-field'
import { UsersFieldError } from '../../../../data/states/add-course-form/users-field/errors'
import { usersFieldAtom } from '../../atoms'
import { ErrorMessage } from '../common/error-message'

const parseKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) =>
  pipe(
    M.value(event.key),
    M.when('Enter', () => AddUserEvent.self),
    M.orElse(() => Nothing.self)
  )

const onInputKeyDown =
  (field: UsersField, setField: SetAtom<UsersField>) =>
  (event: KeyboardEvent<HTMLInputElement>) =>
    pipe(
      UsersField.on,
      apply(parseKeyboardEvent(event)),
      apply(field),
      Effect.map(setField),
      Effect.runPromise
    )

const onInputChange =
  (field: UsersField, setField: SetAtom<UsersField>) =>
  (event: ChangeEvent<HTMLInputElement>) =>
    pipe(
      UsersField.on,
      apply(UpdateInputEvent.of(event.target.value)),
      apply(field),
      Effect.map(setField),
      Effect.runPromise
    )

const onClick =
  (field: UsersField, setField: SetAtom<UsersField>) =>
  (event: MouseEvent<HTMLButtonElement>) =>
    pipe(
      UsersField.on,
      apply(AddUserEvent.self),
      apply(field),
      Effect.map(setField),
      Effect.runPromise
    )

const GetUserError: FC<{ error: UsersFieldError }> = ({ error }) =>
  pipe(
    error,
    Option.match({
      onNone: () => <></>,
      onSome: (error) => <ErrorMessage error={error} />,
    })
  )

const NoUserSelectedError: FC<{ field: UsersField }> = ({ field }) =>
  pipe(
    M.value(field),
    M.tag('InvalidUsersField', (error) => <ErrorMessage error={error} />),
    M.orElse(() => <></>)
  )

export const UserInput: FC<{ id: string }> = ({ id }) => {
  const { texts } = useAtomValue(constantsAtom)
  const { placeholder, addButton } = texts.addCourseForm.users.input
  const [field, setField] = useAtom(usersFieldAtom)

  return (
    <>
      <div className="relative">
        <input
          value={field.input}
          type="search"
          id={id}
          className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          onChange={onInputChange(field, setField)}
          onKeyDown={onInputKeyDown(field, setField)}
        />
        <Button
          className="absolute right-1.5 bottom-1.5 px-2 py-1"
          onClick={onClick(field, setField)}
        >
          {addButton.text}
        </Button>
      </div>
      <NoUserSelectedError field={field} />
      <GetUserError error={field.error} />
    </>
  )
}
