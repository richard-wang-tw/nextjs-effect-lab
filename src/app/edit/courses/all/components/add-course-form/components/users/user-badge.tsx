import { Fork } from '@/app/components/icons'
import { User } from '@/app/data/user'
import { FC } from 'react'

interface UserBadgeProps {
  user: User
  deleteUser: (user: User) => void
}

export const UserBadge: FC<UserBadgeProps> = ({ user, deleteUser }) => (
  <span className="user-badge rounded-full bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 dark:bg-blue-900 dark:text-blue-300">
    {user.name}
    <button
      type="button"
      className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
      data-dismiss-target="#badge-dismiss-default"
      aria-label="Remove"
      onClick={() => deleteUser(user)}
    >
      <Fork className="w-2 h-2" />
    </button>
  </span>
)
