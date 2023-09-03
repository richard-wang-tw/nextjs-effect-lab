import { SideMenu } from '@/components/SideMenu'
import { FC } from 'react'
import { CourseName } from './components/CourseName'
import { DateRange } from './components/DateRange'
import { Description } from './components/Description'
import { Footer } from './components/Footer'
import { TableView } from './components/TableView'
import { Users } from './components/Users'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <TableView />
    <SideMenu title="Add Course" className="w-[500px]" Footer={Footer}>
      <CourseName />
      <DateRange />
      <Description />
      <Users />
    </SideMenu>
  </div>
)

export default Page
