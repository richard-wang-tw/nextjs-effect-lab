import { AddCourse } from './add-course'
import { Table } from './table'

export const TableView = () => (
  <div className="flex-1 flex-col flex items-start justify-start w-full gap-4 p-8">
    <AddCourse />
    <Table />
  </div>
)
