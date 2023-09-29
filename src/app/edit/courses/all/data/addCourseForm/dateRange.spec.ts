import { testClock } from '@/app/data/service/clock'
import { DateRangePickerEvent } from '@/components/DateRangePicker'
import { describe, expect, it } from 'vitest'
import { dateRangeOf } from './dateRange'

describe('dateRangeOf', () => {
  it('should be valid when now < start < end', () => {
    const event: DateRangePickerEvent = {
      start: new Date(testClock.ms() + 1000),
      end: new Date(testClock.ms() + 2000),
    }

    const result = dateRangeOf(testClock)(event)

    expect(result._tag).toBe('ValidDateRange')
  })

  it('should be invalid when start < now < end', () => {
    const event: DateRangePickerEvent = {
      start: new Date(testClock.ms() - 1000),
      end: new Date(testClock.ms() + 1000),
    }

    const result = dateRangeOf(testClock)(event)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when start < end < now', () => {
    const time: DateRangePickerEvent = {
      start: new Date(testClock.ms() - 2000),
      end: new Date(testClock.ms() - 1000),
    }

    const result = dateRangeOf(testClock)(time)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when start date is undefined', () => {
    const time: DateRangePickerEvent = {
      start: undefined,
      end: new Date(testClock.ms() + 1000),
    }

    const result = dateRangeOf(testClock)(time)
    expect(result._tag).toBe('InvalidDateRange')
  })

  it('should be invalid when end date is undefined', () => {
    const time: DateRangePickerEvent = {
      start: new Date(testClock.ms() + 1000),
      end: undefined,
    }

    const result = dateRangeOf(testClock)(time)
    expect(result._tag).toBe('InvalidDateRange')
  })
})
