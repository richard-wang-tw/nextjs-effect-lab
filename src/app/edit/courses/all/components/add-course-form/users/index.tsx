import { textsAtom } from '@/service/atoms'
import { ReadonlyArray, pipe } from 'effect'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { UsersField, usersFieldAtom } from './data'
import { UserBadge } from './user-badge'
import { UserInput } from './user-input'

const Badges = () => {
  const [users, setUsers] = useAtom(usersFieldAtom)
  return pipe(
    users.selected,
    ReadonlyArray.map((user, i) => (
      <UserBadge
        key={i}
        user={user}
        deleteUser={flow(UsersField.deleteUser, setUsers)}
      />
    ))
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
