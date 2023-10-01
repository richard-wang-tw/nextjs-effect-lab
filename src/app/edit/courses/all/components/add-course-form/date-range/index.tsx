import { serviceAtom } from '@/app/data/service/atoms'
import { DateRangePicker } from '@/components/DateRangePicker'
import { doNothing } from '@/lib/utils/doNothing'
import { Equal } from 'effect'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { FC } from 'react'
import { ErrorMessage } from '../common/error-message'
import { Label } from '../common/label'
import { dateRangeAtom, dateRangeOf } from './data'

export const DateRange: FC = () => {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom)
  const { clock, texts } = useAtomValue(serviceAtom)
  const { title, placeholder } = texts.addCourseForm.dateRange
  return (
    <div>
      <Label htmlFor={'date-range-picker'}>{title}</Label>
      <DateRangePicker
        id={'date-range-picker'}
        onChange={flow(dateRangeOf(clock), (newDateRange) =>
          Equal.equals(newDateRange, dateRange)
            ? doNothing()
            : setDateRange(newDateRange)
        )}
        placeholder={placeholder}
      />
      <ErrorMessage {...dateRange} />
    </div>
  )
}
