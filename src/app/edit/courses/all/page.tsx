import { FC } from 'react'
import AddCourseForm from './components/add-course-form'
import { TableView } from './components/courses-table'

const Page: FC = () => (
  <div className="flex w-full h-full">
    <TableView />
    <AddCourseForm />
  </div>
)

export default Page
