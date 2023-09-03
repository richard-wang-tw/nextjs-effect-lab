import { Fork } from '@/components/icons'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'

interface UserBadgeProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const UserBadge: FC<UserBadgeProps> = ({ children, onClick }) => (
  <span className="rounded-full bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 dark:bg-blue-900 dark:text-blue-300">
    {children}
    <button
      type="button"
      className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
      data-dismiss-target="#badge-dismiss-default"
      aria-label="Remove"
      onClick={onClick}
    >
      <Fork className="w-2 h-2" />
      <span className="sr-only">Remove badge</span>
    </button>
  </span>
)
