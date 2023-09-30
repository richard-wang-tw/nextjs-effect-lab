import { String } from 'effect'
import { describe, expect, it } from 'vitest'
import { textInputEventOf, textInputOf } from './data'

describe('textInputOf', () => {
  const limit = { minLen: 1, maxLen: 50 }

  it('should be valid when input length is equal to min length', () => {
    const event = textInputEventOf('a')
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('ValidTextInput')
  })

  it('should be valid when input length is equal to max length', () => {
    const event = textInputEventOf(String.repeat(50)('a'))
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('ValidTextInput')
  })

  it('should be invalid when input length is greater than max length', () => {
    const event = textInputEventOf(String.repeat(51)('a'))
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input length is less than min length', () => {
    const event = textInputEventOf('')
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input includes chinese', () => {
    const event = textInputEventOf('早安 瑪卡巴卡')
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input includes "!"', () => {
    const event = textInputEventOf('He110 w0r1d!')
    const result = textInputOf(limit)(event)
    expect(result._tag).toBe('InvalidTextInput')
  })
})
