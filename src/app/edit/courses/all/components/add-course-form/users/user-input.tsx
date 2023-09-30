import { constantsAtom } from '@/app/data/service/atoms'
import { Button } from '@/components/Button'
import { doNothing } from '@/utils/doNothing'
import { Effect, pipe } from 'effect'
import { useAtom, useAtomValue } from 'jotai'
import { ErrorMessage } from '../common/error-message'
import { UsersField, usersFieldAtom } from './data'
import { addUser } from './feature/add-user'

export const UserInput = () => {
  const { texts } = useAtomValue(constantsAtom)
  const { placeholder, addButton } = texts.addCourseForm.users.input
  const [field, setField] = useAtom(usersFieldAtom)
  return (
    <>
      <div className="relative">
        <input
          value={field.input}
          type="search"
          id="search"
          className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          onChange={(event) =>
            pipe(field, UsersField.updateInput(event.target.value), setField)
          }
          onKeyDown={(event) =>
            pipe(
              addUser(event)(field),
              Effect.match({
                onFailure: doNothing,
                onSuccess: setField,
              }),
              Effect.runPromise
            )
          }
        />
        <Button
          className="absolute right-1.5 bottom-1.5 px-2 py-1"
          onClick={(event) =>
            pipe(
              addUser(event)(field),
              Effect.match({ onFailure: doNothing, onSuccess: setField }),
              Effect.runPromise
            )
          }
        >
          {addButton.text}
        </Button>
      </div>
      <ErrorMessage {...field.error} />
    </>
  )
}
