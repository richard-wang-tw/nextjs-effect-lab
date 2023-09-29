import { textsAtom } from '@/app/data/service/atoms'
import { Option, pipe } from 'effect'
import { useAtomValue } from 'jotai'
import { usersAtom } from '../../../data/addCourseForm/users'
import { UserInput } from './UserInput'

const Badges = () => {
  const users = useAtomValue(usersAtom)
  return pipe(
    users,
    Option.match({
      onNone: () => <></>,
      onSome: () => <></>,
    })
  )
}

export const Users = () => {
  const texts = useAtomValue(textsAtom)
  return (
    <div>
      <label
        data-for="default-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {texts.addCourseForm.users.title}
      </label>
      <div className="flex flex-wrap gap-3 bg-gray-50 rounded-lg border border-gray-300 p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600">
        <Badges />
      </div>
      <UserInput />
    </div>
  )
}
