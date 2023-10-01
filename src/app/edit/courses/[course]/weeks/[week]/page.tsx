import { SideMenu } from '@/app/components/side-menu'
import { WeekView } from '@/app/components/week-view'
import { FC } from 'react'
import { ClassName } from './components/class-name'
import { DateAndTime } from './components/date-and-time'
import { Description } from './components/description'
import { Footer } from './components/footer'
import { Lecturer } from './components/lecturer'
import { Links } from './components/links'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <WeekView />
    <SideMenu title="Add Class" Footer={Footer}>
      <DateAndTime />
      <ClassName />
      <Lecturer />
      <Description />
      <Links />
    </SideMenu>
  </div>
)

export default Page
