import { String } from 'effect'
import { describe, expect, it } from 'vitest'
import { textInputOf } from './textInput'

describe('textInputOf', () => {
  const limit = { minLen: 1, maxLen: 50 }

  it('should be valid when input length is equal to min length', () => {
    const input = 'a'
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('ValidTextInput')
  })

  it('should be valid when input length is equal to max length', () => {
    const input = String.repeat(50)('a')
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('ValidTextInput')
  })

  it('should be invalid when input length is greater than max length', () => {
    const input = String.repeat(51)('a')
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input length is less than min length', () => {
    const input = ''
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input includes chinese', () => {
    const input = '早安 瑪卡巴卡'
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('InvalidTextInput')
  })

  it('should be invalid when input includes "!"', () => {
    const input = 'He110 w0r1d!'
    const result = textInputOf(limit)(input)
    expect(result._tag).toBe('InvalidTextInput')
  })
})
