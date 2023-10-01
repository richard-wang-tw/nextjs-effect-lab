import { SideMenu } from '@/app/components/side-menu'
import { WeekView } from '@/app/components/week-view'
import { FC } from 'react'
import { DateAndTime } from './components/date-and-time'
import { Description } from './components/description'
import { Footer } from './components/footer'
import { Lecturer } from './components/lecturer'
import { Links } from './components/links'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <WeekView />
    <SideMenu title="Course 1" Footer={Footer}>
      <DateAndTime />
      <Lecturer />
      <Description />
      <Links />
    </SideMenu>
  </div>
)

export default Page
