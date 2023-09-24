import { serviceAtom } from '@/app/data/service/atoms'
import { DateRangePicker } from '@/components/DateRangePicker'
import { doNothing } from '@/utils/doNothing'
import { Equal } from 'effect'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { FC } from 'react'
import { dateRangeAtom, dateRangeOf } from '../../data/addCourseForm/dateRange'
import { ErrorMessage } from './common/ErrorMessage'
import { Label } from './common/Label'

export const DateRange: FC = () => {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom)
  const { clock } = useAtomValue(serviceAtom)
  return (
    <div>
      <Label htmlFor={'date-range-picker'}>Date Range</Label>
      <DateRangePicker
        id={'date-range-picker'}
        onChange={flow(dateRangeOf(clock.now()), (newDateRange) =>
          Equal.equals(newDateRange, dateRange)
            ? doNothing()
            : setDateRange(newDateRange)
        )}
      />
      <ErrorMessage {...dateRange} />
    </div>
  )
}
