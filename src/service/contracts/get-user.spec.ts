import {
  NotFoundError,
  UnexpectedAxiosError,
} from '@/app/data/error/request-error'
import { User } from '@/app/data/user'
import { getUserHandler } from '@/msw/endpoints/get-user'
import * as S from '@effect/schema/Schema'
import { Effect, pipe } from 'effect'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { getUser } from './get-user'

describe('GET /api/v1/users/:username', () => {
  const baseUrl = 'http://localhost'
  describe('when exists user richard_01 to richard_99', () => {
    const server = setupServer(
      getUserHandler(baseUrl)('exists user richard_01 to richard_99')
    )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    it('should get a user when username is richard_01', async () => {
      //arrange
      const name = 'richard_01'
      //act
      const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)

      console.log(result)
      //assert
      if (S.is(User.schema)(result)) {
        expect(result.name).toBe(name)
      } else {
        expect(S.is(User.schema)(result)).toBe(true)
      }
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

  describe('when internal error', () => {
    const server = setupServer(
      getUserHandler(baseUrl)('database connection is broken')
    )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    it('should get unexpected axios error', async () => {
      //arrange
      const name = 'richard_01'
      //act
      const result = await pipe(getUser(name), Effect.merge, Effect.runPromise)
      //assert
      expect(S.is(UnexpectedAxiosError.struct)(result)).toBe(true)
    })
  })
})
