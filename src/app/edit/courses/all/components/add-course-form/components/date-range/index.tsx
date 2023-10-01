import { serviceAtom } from '@/app/atoms'
import { Equal, pipe } from 'effect'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import { FC } from 'react'

import { DateRangePicker } from '@/app/components/date-range-picker'
import { doNothing } from '@/utils/doNothing'
import * as M from '@effect/match'
import { dateRangeAtom } from '../../../../atoms'
import { DateRange as DateRangeData } from '../../../../data/states/add-course-form/date-range'
import { ErrorMessage } from '../common/error-message'
import { Label } from '../common/label'

const Error: FC<{ dateRange: DateRangeData }> = ({ dateRange }) =>
  pipe(
    M.value(dateRange),
    M.tag('InvalidDateRange', (error) => <ErrorMessage error={error} />),
    M.orElse(() => <></>)
  )

export const DateRange: FC = () => {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom)
  const { clock, texts } = useAtomValue(serviceAtom)
  const { title, placeholder } = texts.addCourseForm.dateRange
  return (
    <div>
      <Label htmlFor={'date-range-picker'}>{title}</Label>
      <DateRangePicker
        id={'date-range-picker'}
        onChange={flow(DateRangeData(clock).of, (newDateRange) =>
          Equal.equals(newDateRange, dateRange)
            ? doNothing()
            : setDateRange(newDateRange)
        )}
        placeholder={placeholder}
      />
      <Error dateRange={dateRange} />
    </div>
  )
}
