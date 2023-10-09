import { Nothing } from '@/app/data/events'
import { defaultServer } from '@/plugins/msw/server'
import { Effect, Equal, pipe } from 'effect'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { UsersField } from '.'
import { AddUserEvent } from '../../../events/users-field-event'
import { InvalidUsersField } from './invalid'

describe('UsersField.on Nothing', () => {
  const state = InvalidUsersField.ofInput('123')

  it('should not change user field when event is nothing', async () => {
    //arrange
    const event = Nothing.self
    //act
    const result = await pipe(
      UsersField.on(event)(state),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(Equal.equals(state, result)).toBe(true)
  })
})

describe('UsersField.on AddUserEvent', () => {
  const baseUrl = 'http://localhost'
  const server = defaultServer(baseUrl)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should return valid user field without error when get user success', async () => {
    //arrange
    const event = AddUserEvent.self
    const state = InvalidUsersField.ofInput('richard_01')
    //act
    const result = await pipe(state, UsersField.on(event), Effect.runPromise)
    //assert
    expect(result._tag).toBe('ValidUsersField')
    expect(result.error._tag).toBe('None')
  })

  it('should return invalid user field with error when get user failed', async () => {
    //arrange
    const event = AddUserEvent.self
    const state = InvalidUsersField.ofInput('richard_x')
    //act
    const result = await pipe(state, UsersField.on(event), Effect.runPromise)
    //assert
    expect(result._tag).toBe('InvalidUsersField')
    expect(result.error._tag).toBe('Some')
  })
})
