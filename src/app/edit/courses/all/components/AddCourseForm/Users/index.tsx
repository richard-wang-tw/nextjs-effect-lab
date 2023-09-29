import { textsAtom } from '@/app/data/service/atoms'
import { Option, ReadonlyArray, pipe } from 'effect'
import { useAtomValue } from 'jotai'
import { usersAtom } from '../../../data/addCourseForm/users'
import { UserBadge } from './UserBadge'
import { UserInput } from './UserInput'

const Badges = () => {
  const users = useAtomValue(usersAtom)
  return pipe(
    users,
    Option.match({
      onNone: () => <></>,
      onSome: ReadonlyArray.map((user, i) => <UserBadge key={i} user={user} />),
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
      <div className="flex flex-wrap gap-3  mb-2 dark:bg-gray-700 dark:border-gray-600">
        <Badges />
      </div>
      <UserInput />
    </div>
  )
}
