import { textsAtom } from '@/app/atoms'
import { User } from '@/app/data/user'
import { SetAtom } from '@/app/data/utils/hooks'
import { Effect, ReadonlyArray, pipe } from 'effect'
import { apply } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { DeleteUserEvent } from '../../../../data/events/users-field-event'
import { UsersField } from '../../../../data/states/add-course-form/users-field'
import { usersFieldAtom } from '../../atoms'
import { Label } from '../common/label'
import { UserBadge } from './user-badge'
import { UserInput } from './user-input'

const onDeleteUser =
  (field: UsersField, setField: SetAtom<UsersField>) => (user: User) =>
    pipe(
      UsersField.on,
      apply(DeleteUserEvent.of(user)),
      apply(field),
      Effect.map(setField),
      Effect.runPromise
    )

const Badges = () => {
  const [field, setField] = useAtom(usersFieldAtom)
  return pipe(
    field.selected as User[],
    ReadonlyArray.map((user, i) => (
      <UserBadge
        key={i}
        user={user}
        deleteUser={onDeleteUser(field, setField)}
      />
    ))
  )
}

export const Users = () => {
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
