import { textsAtom } from '@/app/atoms'
import { User } from '@/app/data/user'
import { ReadonlyArray, pipe } from 'effect'
import { useAtomValue } from 'jotai'
import { usersFieldAtom } from '../../../../atoms'
import { Label } from '../common/label'
import { UserBadge } from './user-badge'
import { UserInput } from './user-input'

const Badges = () => {
  const field = useAtomValue(usersFieldAtom)
  return pipe(
    field.selected as User[],
    ReadonlyArray.map((user, i) => <UserBadge key={i} user={user} />)
  )
}

export const UsersField = () => {
  const texts = useAtomValue(textsAtom)
  return (
    <div>
      <Label htmlFor="text-field-input">
        {texts.addCourseForm.users.title}
      </Label>
      <div className="flex flex-wrap gap-3 mb-2 dark:bg-gray-700 dark:border-gray-600">
        <Badges />
      </div>
      <UserInput id="text-field-input" />
    </div>
  )
}
