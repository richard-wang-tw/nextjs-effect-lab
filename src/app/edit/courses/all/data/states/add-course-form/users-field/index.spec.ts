import { Nothing } from '@/app/data/events'
import {
  getUser200Invalid,
  getUser404,
  getUser500,
} from '@/msw/resolvers/get-user'
import { initServer } from '@/msw/server'
import { Effect, Equal, Option, pipe } from 'effect'
import { rest } from 'msw'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { UsersField } from '.'
import { AddUserEvent } from '../../../events/users-event'
import { InvalidUsersField } from './invalid'

describe('addUser', () => {
  const url = 'http://localhost'
  const server = initServer(url)
  const state = InvalidUsersField.ofInput('123')
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

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
    server.use(rest.get(url + '/api/v1/users/:username', getUser200Invalid))
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
    server.use(rest.get(url + '/api/v1/users/:username', getUser500))
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

  it('should have not found error when status 400', async () => {
    //arrange
    server.use(rest.get(url + '/api/v1/users/:username', getUser404))
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
