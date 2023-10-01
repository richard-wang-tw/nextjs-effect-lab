import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './button'

interface IconButtonProps extends PropsWithChildren {
  className?: string
}

export const IconButton: FC<IconButtonProps> = ({ children, className }) => (
  <Button theme="light" className={twMerge('border-none p-1', className)}>
    {children}
  </Button>
)
