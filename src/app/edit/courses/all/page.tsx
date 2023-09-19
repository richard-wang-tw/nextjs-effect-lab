import { FC } from 'react'
import AddCourseForm from './components/AddCourseForm'
import { TableView } from './components/CoursesTable'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <TableView />
    <AddCourseForm />
  </div>
)

export default Page
