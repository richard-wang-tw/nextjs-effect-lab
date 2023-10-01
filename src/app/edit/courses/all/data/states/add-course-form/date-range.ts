import { DateRangePickerEvent } from '@/app/components/date-range-picker'
import { Clock } from '@/service/clock'
import * as S from '@effect/schema/Schema'
import { Data, Either, Option, pipe } from 'effect'

export type DateRange = InitialDateRange | ValidDateRange | InvalidDateRange

export class InitialDateRange extends S.Class<InitialDateRange>()({
  _tag: S.literal('InitialDateRange'),
}) {
  static self = Data.tagged<InitialDateRange>('InitialDateRange')()
}

export class ValidDateRange extends S.Class<ValidDateRange>()({
  _tag: S.literal('ValidDateRange'),
  start: S.string,
  end: S.string,
}) {
  static of = ({ start, end }: DateRangePickerEvent) =>
    Data.tagged<ValidDateRange>('ValidDateRange')({
      start: start === undefined ? '' : start.toISOString(),
      end: end === undefined ? '' : end.toISOString(),
    })
}

export class InvalidDateRange extends S.Class<InvalidDateRange>()({
  _tag: S.literal('InvalidDateRange'),
  start: S.string,
  end: S.string,
  reason: S.string,
}) {
  static of =
    ({ start, end }: DateRangePickerEvent) =>
    (reason: string) =>
      Data.tagged<InvalidDateRange>('InvalidDateRange')({
        start: start === undefined ? '' : start.toISOString(),
        end: end === undefined ? '' : end.toISOString(),
        reason,
      })
}

const of = (clock: Clock) => (event: DateRangePickerEvent) =>
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
      return clock.now() < start && start < end
        ? Either.right(event)
        : Either.left('Please follow today < start date < end date' as const)
    }),
    Either.match({
      onLeft: InvalidDateRange.of(event),
      onRight: ValidDateRange.of,
    })
  )

export const DateRange = (clock: Clock) => ({
  of: of(clock),
})
