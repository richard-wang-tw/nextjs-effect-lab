export interface Clock {
  now: () => Date
  /**
   * @returns milliseconds since midnight, January 1, 1970 UTC
   */
  ms: () => number
}

const now = () => new Date()

const ms = () => now().getTime()

const clock: Clock = { now, ms }

const of = (ms: number): Clock => ({
  ms: () => ms,
  now: () => new Date(ms),
})
const testClock: Clock = {
  ms: () => new Date('2000-01-01T00:00:00Z').getTime(),
  now: () => new Date('2000-01-01T00:00:00Z'),
}

export const Clock = {
  default: clock,
  /**
   * Clock.now is `2000/01/01 00:00:00`
   */
  test: testClock,
  /**
   * Create a fixed time test clock by ms from `1970/01/01 00:00:00`
   */
  of,
}
