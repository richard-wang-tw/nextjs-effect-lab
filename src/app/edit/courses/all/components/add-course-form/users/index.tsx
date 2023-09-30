import { textsAtom } from '@/app/data/service/atoms'
import { Option, ReadonlyArray, pipe } from 'effect'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { deleteUser, usersAtom } from './data'
import { UserBadge } from './user-badge'
import { UserInput } from './user-input'

const Badges = () => {
  const [users, setUsers] = useAtom(usersAtom)
  return pipe(
    users,
    Option.match({
      onNone: () => <></>,
      onSome: ReadonlyArray.map((user, i) => (
        <UserBadge
          key={i}
          user={user}
          deleteUser={flow(deleteUser, setUsers)}
        />
      )),
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
