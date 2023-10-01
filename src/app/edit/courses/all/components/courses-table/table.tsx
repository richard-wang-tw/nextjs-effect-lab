import { IconButton } from '@/app/components/icon-button'
import * as Icons from '@/app/components/icons'
import { FC } from 'react'

interface RowProps {
  name: string
}

const Row: FC<RowProps> = ({ name }) => (
  <tr className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {name}
    </th>
    <td className="px-6 py-4">...</td>
    <td className="px-6 py-4 flex items-center justify-center gap-1">
      <IconButton>
        <Icons.FileEdit />
      </IconButton>
      <IconButton>
        <Icons.CalenderEdit />
      </IconButton>
      <IconButton>
        <Icons.TrashBin />
      </IconButton>
    </td>
  </tr>
)

export const Table: FC = () => (
  <div className="relative overflow-x-auto rounded-lg border w-full dark:border-gray-700">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800 bg-white">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 w-[200px]">
            Course Name
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3 w-[100px]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <Row name="Course Name 1" />
        <Row name="Course Name 2" />
        <Row name="Course Name ..." />
        <Row name="Course Name ..." />
        <Row name="Course Name ..." />
        <Row name="Course Name ..." />
        <Row name="Course Name ..." />
        <Row name="Course Name ..." />
      </tbody>
    </table>
  </div>
)
