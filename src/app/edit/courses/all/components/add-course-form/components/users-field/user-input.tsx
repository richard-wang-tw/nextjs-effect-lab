import { constantsAtom, contractsAtom } from '@/app/atoms'
import { Button } from '@/app/components/button'
import { Nothing } from '@/app/data/events'
import { SetAtom } from '@/app/data/utils/hooks'
import { GetUser } from '@/service/contracts'
import * as M from '@effect/match'
import { Context, Effect, Option, pipe } from 'effect'
import { useAtom, useAtomValue } from 'jotai'
import { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react'
import { usersFieldAtom } from '../../../../atoms'
import {
  AddUserEvent,
  UpdateInputEvent,
} from '../../../../data/events/users-field-event'
import { UsersField } from '../../../../data/states/add-course-form/users-field'
import { UsersFieldError } from '../../../../data/states/add-course-form/users-field/errors'
import { ErrorMessage } from '../common/error-message'

const parseKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) =>
  pipe(
    M.value(event.key),
    M.when('Enter', () => AddUserEvent.self),
    M.orElse(() => Nothing.self)
  )

const onInputKeyDown =
  (service: UserInputService) => (event: KeyboardEvent<HTMLInputElement>) =>
    pipe(
      parseKeyboardEvent(event),
      UsersField.on,
      Effect.provideService(UserInputService.context, service),
      Effect.map(service.setField),
      Effect.runPromise
    )

const onInputChange =
  (service: UserInputService) => (event: ChangeEvent<HTMLInputElement>) =>
    pipe(
      UsersField.on(UpdateInputEvent.of(event.target.value)),
      Effect.provideService(UserInputService.context, service),
      Effect.map(service.setField),
      Effect.runPromise
    )

const onClick =
  (service: UserInputService) => (event: MouseEvent<HTMLButtonElement>) =>
    pipe(
      UsersField.on(AddUserEvent.self),
      Effect.provideService(UserInputService.context, service),
      Effect.map(service.setField),
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

export interface UserInputService {
  getUser: GetUser
  field: UsersField
  setField: SetAtom<UsersField>
}

export const UserInputService = {
  context: Context.Tag<UserInputService>(),
  of: (service: UserInputService) => service,
}

export const UserInput: FC<{ id: string }> = ({ id }) => {
  const { texts } = useAtomValue(constantsAtom)
  const { placeholder, addButton } = texts.addCourseForm.users.input
  const [field, setField] = useAtom(usersFieldAtom)
  const { getUser } = useAtomValue(contractsAtom)
  const service = { field, setField, getUser }
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
          onChange={onInputChange(service)}
          onKeyDown={onInputKeyDown(service)}
        />
        <Button
          className="absolute right-1.5 bottom-1.5 px-2 py-1"
          onClick={onClick(service)}
        >
          {addButton.text}
        </Button>
      </div>
      <NoUserSelectedError field={field} />
      <GetUserError error={field.error} />
    </>
  )
}
