import {
  NotFoundError,
  UnexpectedAxiosError,
} from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import { User } from '@/app/data/user'
import { getUsersByNameHandler } from '@/msw/endpoints/get-user-by-name'
import { initServer } from '@/msw/server'
import * as S from '@effect/schema/Schema'
import { Effect, pipe } from 'effect'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { getUser } from './get-user'

describe('[Consumer] getUser', () => {
  const name = '123'
  const baseUrl = 'http://localhost'
  const server = initServer(baseUrl)
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should return user when status 200 with valid body', async () => {
    //arrange - server.listen()
    //act
    const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
    //assert
    expect(S.is(User.schema)(result)).toBe(true)
  })

  it('should have validate error when status 200 with invalid body', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('200 invalid'))
    //act
    const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
    //assert
    expect(S.is(ValidateError.struct)(result)).toBe(true)
  })

  it('should have unexpected axios error when status 500', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('500'))
    //act
    const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
    //assert
    expect(S.is(UnexpectedAxiosError.struct)(result)).toBe(true)
  })

  it('should have not found error when status 404', async () => {
    //arrange
    server.use(getUsersByNameHandler(baseUrl)('404'))
    //act
    const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
    //assert
    expect(S.is(NotFoundError.struct)(result)).toBe(true)
  })
})
