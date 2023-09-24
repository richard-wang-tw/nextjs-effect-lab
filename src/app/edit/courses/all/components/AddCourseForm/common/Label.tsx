import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  htmlFor: string
}

export const Label: FC<Props> = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    {children}
  </label>
)
