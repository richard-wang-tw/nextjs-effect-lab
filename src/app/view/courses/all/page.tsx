import { FC } from 'react'
import { TableView } from './components/TableView'
const Page: FC = () => (
  //TODO: case only 1 course, redirect to the course
  <div className="flex w-full h-full">
    <TableView />
  </div>
)

export default Page
