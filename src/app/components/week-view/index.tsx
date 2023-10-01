import { FC, PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'
import { Button } from '../button'
import { DatePicker } from '../date-picker'
import { ArrowLeft, ArrowRight } from '../icons'

interface RowProps {
  name: string
}

interface HeaderCellProps extends PropsWithChildren {
  className?: string
}
const HeaderCell: FC<HeaderCellProps> = ({ children, className }) => (
  <div
    className={twJoin(
      'select-none px-6 py-3 flex justify-center items-center font-medium text-gray-900 whitespace-nowrap uppercase  dark:text-gray-400',
      className
    )}
  >
    {children}
  </div>
)

const HeaderRow = () => (
  <div className="h-[40px] flex rounded-t-lg bg-gray-50 dark:bg-gray-700">
    <HeaderCell className="w-[120px]"></HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/04 Mon
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/05 Tue
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/06 Wed
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/07 Thu
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/08 Fri
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/09 Sat
    </HeaderCell>
    <HeaderCell className="dark:border-gray-700 border-l flex-1">
      09/10 Sun
    </HeaderCell>
  </div>
)

const Cell = () => (
  <div className="border-l dark:border-gray-700 flex-1 cursor-pointer select-none flex flex-col">
    <div className="flex-1 w-full border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" />
    <div className="flex-1 w-full  hover:bg-gray-50 dark:hover:bg-gray-600" />
  </div>
)

const Row: FC<RowProps> = ({ name }) => (
  <div className="flex-1 flex border-t  dark:border-gray-700">
    <HeaderCell className="w-[120px]">{name}</HeaderCell>
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
  </div>
)

const WeekTable = () => (
  <div
    className={twJoin(
      'h-[calc(100%-70px)] min-h-[600px] w-full min-w-[1000px]',
      'flex flex-col',
      'text-sm  text-gray-500 dark:text-gray-400 rounded-lg border dark:border-gray-700',
      'bg-white  dark:bg-gray-800'
    )}
  >
    <HeaderRow />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
    <Row name="08:00 - 09:00" />
  </div>
)

export const WeekView: FC = () => (
  <div className="w-full h-full px-8 pb-4 overflow-auto flex-1">
    <div className="h-[70px] flex items-center justify-end gap-4">
      <DatePicker />
      <div className="flex gap-2">
        <Button
          theme="light"
          className="w-24 h-10 p-0 flex justify-center items-center"
        >
          <ArrowLeft />
        </Button>
        <Button
          theme="light"
          className="w-24 h-10 p-0 flex justify-center items-center"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
    <WeekTable />
  </div>
)
