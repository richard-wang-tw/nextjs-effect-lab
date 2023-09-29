import { constantsAtom } from '@/app/data/service/atoms'
import { Button } from '@/components/Button'
import { doNothing } from '@/utils/doNothing'
import { Option, ReadonlyArray, pipe } from 'effect'
import { useAtomValue, useSetAtom } from 'jotai'
import { SetStateAction, useState } from 'react'
import {
  Users,
  administratorOf,
  usersAtom,
} from '../../../data/addCourseForm/users'

const addUser = (props: UserInputStates) => {
  const { setUsers, setInput, input } = props
  setUsers((users) =>
    pipe(
      users,
      Option.match({
        onSome: (users) =>
          Option.some(
            ReadonlyArray.append(administratorOf({ name: input }))(users)
          ),
        onNone: () => Option.some([administratorOf({ name: input })]),
      })
    )
  )
  setInput('')
}

interface UserInputStates {
  setUsers: (props: SetStateAction<Option.Option<Users>>) => void
  setInput: (users: string) => void
  input: string
}

export const UserInput = () => {
  const { texts } = useAtomValue(constantsAtom)
  const [input, setInput] = useState('')
  const { placeholder, addButton } = texts.addCourseForm.users.input
  const setUsers = useSetAtom(usersAtom)
  const states = { setUsers, setInput, input }
  return (
    <div className="relative">
      <input
        value={input}
        type="search"
        id="search"
        className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key == 'Enter' ? addUser(states) : doNothing())}
      />
      <Button
        className="absolute right-1.5 bottom-1.5 px-2 py-1"
        onClick={() => addUser(states)}
      >
        {addButton.text}
      </Button>
    </div>
  )
}
