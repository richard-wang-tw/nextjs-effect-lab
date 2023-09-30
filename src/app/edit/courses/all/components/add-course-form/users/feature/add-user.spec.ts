import { Effect, pipe } from 'effect'
import { describe, expect, it } from 'vitest'
import { UsersField } from '../data'
import { addUser } from './add-user'

describe('addUser', () => {
  it('should return NotTargetEvent when event has key and key is not Enter', async () => {
    const event = { key: 'xxx' }
    const result = await pipe(
      addUser(event)(UsersField.init),
      Effect.merge,
      Effect.runPromise
    )
    expect(result).toBe('NotTargetEvent')
  })

  it('should return Option.Some when event has key and key is Enter', async () => {
    const event = { key: 'Enter' }
    const result = await pipe(
      addUser(event)(UsersField.init),
      Effect.merge,
      Effect.runPromise
    )
    expect(result).not.toBe('NotTargetEvent')
  })

  it('should return Option.Some when event has no key', async () => {
    const event = {}
    const result = await pipe(
      addUser(event)(UsersField.init),
      Effect.merge,
      Effect.runPromise
    )
    expect(result).not.toBe('NotTargetEvent')
  })

  it('should return UnexpectedError when mock service is off', async () => {
    const event = {}
    const result = await pipe(
      addUser(event)(UsersField.init),
      Effect.merge,
      Effect.runPromise
    )
    expect(result).not.toBe('NotTargetEvent')
    const error = (result as UsersField).error
    expect(error._tag).toBe('UnexpectedRequestError')
  })
})
