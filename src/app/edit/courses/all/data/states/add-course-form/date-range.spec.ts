import { DateRangePickerEvent } from '@/app/components/date-range-picker'
import { Clock } from '@/service/clock'
import { describe, expect, it } from 'vitest'
import { DateRange } from './date-range'

describe('dateRangeOf', () => {
  it('should be valid when now < start < end', () => {
    const event: DateRangePickerEvent = {
      start: new Date(Clock.test.ms() + 1000),
      end: new Date(Clock.test.ms() + 2000),
    }

    const result = DateRange(Clock.test).of(event)

    expect(result._tag).toBe('ValidDateRange')
  })

  it('should be invalid when start < now < end', () => {
    const event: DateRangePickerEvent = {
      start: new Date(Clock.test.ms() - 1000),
      end: new Date(Clock.test.ms() + 1000),
    }

    const result = DateRange(Clock.test).of(event)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when start < end < now', () => {
    const event: DateRangePickerEvent = {
      start: new Date(Clock.test.ms() - 2000),
      end: new Date(Clock.test.ms() - 1000),
    }

    const result = DateRange(Clock.test).of(event)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when start date is undefined', () => {
    const event: DateRangePickerEvent = {
      start: undefined,
      end: new Date(Clock.test.ms() + 1000),
    }

    const result = DateRange(Clock.test).of(event)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when end date is undefined', () => {
    const event: DateRangePickerEvent = {
      start: new Date(Clock.test.ms() + 1000),
      end: undefined,
    }
    const result = DateRange(Clock.test).of(event)
    expect(result._tag).toBe('InvalidDateRange')
  })
})
