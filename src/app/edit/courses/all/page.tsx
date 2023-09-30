import { FC } from 'react'
import { TableView } from './components/CoursesTable'
import AddCourseForm from './components/add-course-form'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <TableView />
    <AddCourseForm />
  </div>
)

export default Page
