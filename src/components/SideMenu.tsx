import { IconButton } from '@/components/IconButton'
import { Fork } from '@/components/icons'
import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  title: string
}

const Header: FC<HeaderProps> = ({ title }) => (
  <div className="text-xl dark:border-gray-600  border-b px-8 py-4 flex justify-between items-center">
    <div>{title}</div>
    <IconButton>
      <Fork className="text-gray-700 dark:text-white w-3 h-3" />
    </IconButton>
  </div>
)

interface SideMenuProps extends PropsWithChildren {
  Footer: FC
  title: string
  className?: string
}

export const SideMenu: FC<SideMenuProps> = ({
  Footer,
  title,
  className,
  children,
}) => (
  <div
    className={twMerge(
      'dark:border-gray-600 w-[400px] border-l flex flex-col  overflow-auto',
      className
    )}
  >
    <Header title={title} />
    <div className="mb-6 flex flex-col gap-6 m-8 flex-1">{children}</div>
    <div className="dark:border-gray-600 text-xl border-t px-8 py-4 flex justify-end items-center gap-2">
      <Footer />
    </div>
  </div>
)
