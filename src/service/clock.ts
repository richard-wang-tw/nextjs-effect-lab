export interface Clock {
  now: () => Date
  /**
   * @returns milliseconds since midnight, January 1, 1970 UTC
   */
  ms: () => number
}

const now = () => new Date()

const ms = () => now().getTime()

export const clock: Clock = { now, ms }

export const testClockOf = (ms: number): Clock => ({
  ms: () => ms,
  now: () => new Date(ms),
})

/**
 * Clock.now is `2000/01/01 00:00:00`
 */
export const testClock: Clock = {
  ms: () => new Date('2000-01-01T00:00:00Z').getTime(),
  now: () => new Date('2000-01-01T00:00:00Z'),
}
