import {
  NotFoundError,
  UnexpectedAxiosError,
} from '@/app/data/error/request-error'
import { User } from '@/app/data/user'
import { getUserHandler } from '@/plugins/msw/endpoints/get-user'
import * as S from '@effect/schema/Schema'
import { Effect, pipe } from 'effect'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { getUser } from './get-user'

describe('GET /api/v1/users/:username', () => {
  const baseUrl = 'http://localhost'
  const server = setupServer()
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  describe('when exists user richard_00 to richard_99', () => {
    beforeEach(() => {
      server.use(
        getUserHandler(baseUrl)('exists user richard_00 to richard_99')
      )
    })
    it('should get a user when username is richard_01', async () => {
      //arrange
      const username = 'richard_01'
      //act
      const result = await pipe(
        getUser(username),
        Effect.merge,
        Effect.runPromise
      )
      //assert
      const data = S.parseSync(User.schema)(result)
      expect(data.name).toBe(username)
    })

    it('should get not found error when username is richard_x', async () => {
      //arrange
      const name = 'richard_x'
      //act
      const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
      //assert
      expect(S.is(NotFoundError.struct)(result)).toBe(true)
    })
  })

  it('should get unexpected axios error when internal error', async () => {
    //arrange
    server.use(getUserHandler(baseUrl)('database connection is broken'))
    const name = 'richard_01'
    //act
    const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
    //assert
    expect(S.is(UnexpectedAxiosError.struct)(result)).toBe(true)
  })
})
