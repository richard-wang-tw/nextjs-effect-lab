import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class DateRangeChangedEvent extends S.Class<DateRangeChangedEvent>()({
  _tag: S.literal('DateRangeChangedEvent'),
  start: S.DateFromSelf,
  end: S.DateFromSelf,
}) {
  static is = S.is(DateRangeChangedEvent.struct)
  static of = Data.tagged<DateRangeChangedEvent>('DateRangeChangedEvent')
}

const aaaa = DateRangeChangedEvent
