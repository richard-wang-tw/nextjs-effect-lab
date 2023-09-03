import { SideMenu } from '@/components/SideMenu'
import { WeekView } from '@/components/WeekView'
import { FC } from 'react'
import { DateAndTime } from './components/DateAndTime'
import { Description } from './components/Description'
import { Footer } from './components/Footer'
import { Lecturer } from './components/Lecturer'
import { Links } from './components/Links'

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
