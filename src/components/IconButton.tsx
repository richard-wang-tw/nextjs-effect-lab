import { Button } from '@/components/Button'
import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends PropsWithChildren {
  className?: string
}

export const IconButton: FC<IconButtonProps> = ({ children, className }) => (
  <Button type="light" className={twMerge('border-none p-1', className)}>
    {children}
  </Button>
)
