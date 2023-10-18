import {
  RequestNotFoundError,
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
import { PactV3 } from '@pact-foundation/pact'
import * as path from 'path'
import { regex, url } from '@pact-foundation/pact/src/v3/matchers'

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'Course System GUI',
  provider: 'Course System API',
})

describe('When exists user richard_00 to richard_99', () => {
  beforeAll(() => {
    provider.given('user list including richard_01 to richard_99')
  })
  it('GET /api/v1/users/richard_01 should return User', async () => {
    //arrange
    const username = 'richard_01'
    await provider
      .uponReceiving(`a request with user name ${username}`)
      .withRequest({
        method: 'GET',
        path: `/api/v1/users/${username}`,
      })
      .willRespondWith({
        status: 200,
        body: {
          _tag: 'Administrator',
          name: username,
        },
      })
      .executeTest(async (server) => {
        //act
        const result = await pipe(
          getUser(server.url)(username),
          Effect.merge,
          Effect.runPromise
        )
        //assert
        const data = S.parseSync(User.schema)(result)
        expect(data.name).toBe(username)
      })
  })
  it('GET /api/v1/users/richard_x should return RequestNotFoundError', async () => {
    //arrange
    const username = 'richard_x'
    await provider
      .given('user list including richard_01 to richard_99')
      .uponReceiving(`a request with user name ${username}`)
      .withRequest({
        method: 'GET',
        path: `/api/v1/users/${username}`,
      })
      .willRespondWith({
        status: 404,
      })
      .executeTest(async (server) => {
        //act
        const result = await pipe(
          getUser(server.url)(username),
          Effect.merge,
          Effect.runPromise
        )
        //assert
        expect(result._tag).toBe('RequestNotFoundError')
      })
  })
})
describe('When failed to connect to database', () => {
  beforeAll(() => {
    provider.given('failed to connect to database')
  })
  it('GET /api/v1/users/richard_01 should return UnexpectedAxiosError', async () => {
    //arrange
    const username = 'richard_01'
    await provider
      .addInteraction({
        uponReceiving: `a request with user name ${username}`,
        withRequest: {
          method: 'GET',
          path: `/api/v1/users/${username}`,
        },
        willRespondWith: {
          status: 500,
        },
      })
      .executeTest(async (server) => {
        //act
        const result = await pipe(
          getUser(server.url)(username),
          Effect.merge,
          Effect.runPromise
        )
        //assert
        expect(result._tag).toBe('UnexpectedAxiosError')
      })
  })
})
