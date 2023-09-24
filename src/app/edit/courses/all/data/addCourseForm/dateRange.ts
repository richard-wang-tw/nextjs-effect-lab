import { DateRangePickerEvent } from '@/components/DateRangePicker'
import { Data, Either, Option, pipe } from 'effect'
import { atom } from 'jotai'

const ofValid = ({ start, end }: { start: Date; end: Date }) =>
  Data.tagged<ValidDateRange>('ValidDateRange')({
    start: start.toISOString(),
    end: end.toISOString(),
  })

const ofInvalid =
  ({ start, end }: DateRangePickerEvent) =>
  (reason: string) =>
    Data.tagged<InvalidDateRange>('InvalidDateRange')({
      start: start === undefined ? '' : start.toISOString(),
      end: end === undefined ? '' : end.toISOString(),
      reason,
    })

export type DateRange = InitialDateRange | ValidDateRange | InvalidDateRange

export interface InitialDateRange extends Data.Case {
  readonly _tag: 'InitialDateRange'
}

export interface ValidDateRange extends Data.Case {
  readonly _tag: 'ValidDateRange'
  readonly start: string
  readonly end: string
}
export interface InvalidDateRange extends Data.Case {
  readonly _tag: 'InvalidDateRange'
  readonly start: string
  readonly end: string
  readonly reason: string
}

export const initialDateRange =
  Data.tagged<InitialDateRange>('InitialDateRange')()

export const dateRangeAtom = atom<DateRange>(initialDateRange)

export const dateRangeOf = (now: Date) => (event: DateRangePickerEvent) =>
  pipe(
    {
      start: Option.fromNullable(event.start),
      end: Option.fromNullable(event.end),
    },
    Option.all,
    Either.fromOption(
      () => 'Both start date and end date should not be empty' as const
    ),
    Either.flatMap((event) => {
      const { start, end } = event
      return now < start && start < end
        ? Either.right(event)
        : Either.left('Please follow today < start date < end date' as const)
    }),
    Either.match({
      onLeft: ofInvalid(event),
      onRight: ofValid,
    })
  )
