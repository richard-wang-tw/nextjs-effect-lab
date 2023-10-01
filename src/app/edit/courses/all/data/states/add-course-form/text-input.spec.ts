import { String } from 'effect'
import { describe, expect, it } from 'vitest'
import { TextInputEvent, TextInputLimit } from '../../events/text-input-event'
import { InvalidTextInput, TextInput, ValidTextInput } from './text-input'
describe('textInputOf', () => {
  const limit = TextInputLimit.of({ minLen: 1, maxLen: 50 })

  it('should be valid when input length is equal to min length', () => {
    const event = TextInputEvent.of(limit)('a')
    const result = TextInput.on(event)
    expect(result._tag).toBe('ValidTextInput')
  })

  it('should be valid when input length is equal to max length', () => {
    const event = TextInputEvent.of(limit)(String.repeat(50)('a'))
    const result = TextInput.on(event)
    expect(ValidTextInput.is(result)).toBe(true)
  })

  it('should be invalid when input length is greater than max length', () => {
    const event = TextInputEvent.of(limit)(String.repeat(51)('a'))
    const result = TextInput.on(event)
    expect(InvalidTextInput.is(result)).toBe(true)
  })

  it('should be invalid when input length is less than min length', () => {
    const event = TextInputEvent.of(limit)('')
    const result = TextInput.on(event)
    expect(InvalidTextInput.is(result)).toBe(true)
  })

  it('should be invalid when input includes chinese', () => {
    const event = TextInputEvent.of(limit)('早安 瑪卡巴卡')
    const result = TextInput.on(event)
    expect(InvalidTextInput.is(result)).toBe(true)
  })

  it('should be invalid when input includes "!"', () => {
    const event = TextInputEvent.of(limit)('He110 w0r1d!')
    const result = TextInput.on(event)
    expect(InvalidTextInput.is(result)).toBe(true)
  })
})
