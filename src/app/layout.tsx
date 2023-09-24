import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { ServiceProvider } from './components/ServiceProvider'
import { importSettings } from './data/service/settings'
import { importTexts } from './data/service/texts'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Course Schedule',
  description: 'Generated by create next app',
}

const NavBar = () => (
  <div className="container flex items-center justify-between mx-auto px-8 py-4">
    <div className="flex gap-3">
      <div className="flex items-center">
        <Image src={'/logo.png'} alt={'icon'} width={24} height={24}></Image>
      </div>
      <a href="/" className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Course Schedule
        </span>
      </a>
    </div>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      Richard W
    </div>
  </div>
)

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const settings = await importSettings('default')
  const texts = await importTexts('en')
  const constants = { settings, texts }

  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ServiceProvider {...constants} />
        <div className="h-screen w-screen schema flex flex-col">
          <div className="border-b dark:border-gray-600 h-[65px]">
            <NavBar />
          </div>
          <div className="container mx-auto min-w-screen h-[calc(100vh-65px)]">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
