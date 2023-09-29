import { ButtonHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'

const CLASS_NAMES = {
  primary:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  light:
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
} as const

interface ButtonProps
  extends React.PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: keyof typeof CLASS_NAMES
}

export const Button: FC<ButtonProps> = ({ className, theme, children }) => (
  <button
    type="button"
    className={twMerge(CLASS_NAMES[theme ?? 'primary'], className)}
  >
    {children}
  </button>
)
