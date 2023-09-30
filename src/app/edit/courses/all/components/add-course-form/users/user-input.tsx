import { constantsAtom } from '@/app/data/service/atoms'
import { Button } from '@/components/Button'
import { doNothing } from '@/utils/doNothing'
import { Option } from 'effect'
import { apply, flow } from 'effect/Function'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { addUser, userInputAtom, userInputStateAtom } from './data'

export const UserInput = () => {
  const { texts } = useAtomValue(constantsAtom)
  const { placeholder, addButton } = texts.addCourseForm.users.input
  const [state, setState] = useAtom(userInputStateAtom)
  const setInput = useSetAtom(userInputAtom)
  return (
    <div className="relative">
      <input
        value={state.input}
        type="search"
        id="search"
        className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={flow(
          addUser,
          apply(state),
          Option.match({ onNone: doNothing, onSome: setState })
        )}
      />
      <Button
        className="absolute right-1.5 bottom-1.5 px-2 py-1"
        onClick={flow(
          addUser,
          apply(state),
          Option.match({ onNone: doNothing, onSome: setState })
        )}
      >
        {addButton.text}
      </Button>
    </div>
  )
}
