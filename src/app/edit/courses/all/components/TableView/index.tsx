import { AddCourse } from './AddCourse'
import { Table } from './Table'

export const TableView = () => (
  <div className="flex-1 flex-col flex items-start justify-start w-full gap-4 p-8">
    <AddCourse />
    <Table />
  </div>
)
