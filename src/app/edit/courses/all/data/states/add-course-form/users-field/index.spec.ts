import { Nothing } from '@/app/data/events'
import { getUsersByNameHandler } from '@/msw/endpoints/get-user-by-name'
import { initServer } from '@/msw/server'
import { Effect, Equal, Option, pipe } from 'effect'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { UsersField } from '.'
import { AddUserEvent } from '../../../events/users-event'
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
  const server = initServer(baseUrl)
  const state = InvalidUsersField.ofInput('123')
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should return valid user field when status 200 with valid body', async () => {
    //arrange
    const event = AddUserEvent.self
    //act
    const result = await pipe(
      UsersField.on(event)(state),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('ValidUsersField')
    expect(result.error._tag).toBe('None')
  })

  it('should have validate error when status 200 with invalid body', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('200 invalid'))
    const event = AddUserEvent.self
    //act
    const result = await pipe(
      UsersField.on(event)(state),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('InvalidUsersField')
    if (Option.isSome(result.error)) {
      expect(result.error.value._tag).toBe('ValidateError')
    } else {
      expect(result.error._tag).toBe('Some')
    }
  })

  it('should have unexpected axios error when status 500', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('500'))
    const event = AddUserEvent.self
    //act
    const result = await pipe(
      UsersField.on(event)(state),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('InvalidUsersField')
    if (Option.isSome(result.error)) {
      expect(result.error.value._tag).toBe('UnexpectedAxiosError')
    } else {
      expect(result.error._tag).toBe('Some')
    }
  })

  it('should have not found error when status 404', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('404'))
    const event = AddUserEvent.self
    //act
    const result = await pipe(
      UsersField.on(event)(state),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('InvalidUsersField')
    if (Option.isSome(result.error)) {
      expect(result.error.value._tag).toBe('NotFoundError')
    } else {
      expect(result.error._tag).toBe('Some')
    }
  })
})
