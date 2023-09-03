import { FC, PropsWithChildren } from 'react'

interface LinkProps extends PropsWithChildren {
  href: string
}

const Link: FC<LinkProps> = ({ children, href }) => (
  <a className="hover:text-blue-500" href={href} target="_blank">
    {children}
  </a>
)

export const Links = () => (
  <div>
    <label
      data-for="default-input"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Links
    </label>
    <div className="grid gird-col">
      <Link href={'https://www.google.com'}>Google</Link>
      <Link href={'https://nextjs.org/'}>Next.js</Link>
    </div>
  </div>
)
