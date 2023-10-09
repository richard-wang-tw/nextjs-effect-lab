/**
 * @vitest-environment edge-runtime
 */

import { UserDocument, UserModel } from '@/app/api/models/user'
import { User } from '@/app/data/user'
import MongooseEx from '@/plugins/mongoose-ex'
import { Env } from '@/service/env'
import * as S from '@effect/schema/Schema'
import { Effect, ReadonlyArray as RA, pipe } from 'effect'
import {
  StartedMongoTestContainer,
  startedMongoTestContainerOf,
} from 'testcontainers-mongoose'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { GET } from './route'

const richard00To99: UserDocument[] = pipe(
  RA.replicate(100)(''),
  RA.map((_, i) => `0${i}`.slice(-2)),
  RA.map((index) => ({
    name: `richard_${index}`,
    role: 'Administrator',
  }))
)

describe('GET /api/v1/users/[username]', () => {
  describe('in the case of user richard_00 to richard_99 exists', () => {
    let mongoTestContainer: StartedMongoTestContainer
    beforeAll(async () => {
      mongoTestContainer = await startedMongoTestContainerOf('mongo:7.0.0')
      const mongoUri = mongoTestContainer.getUri()
      vi.stubEnv('DB_URI', mongoUri)
      const env = S.parseSync(Env)(process.env)
      await MongooseEx.connect(env).pipe(Effect.runPromise)
      await UserModel.insertMany(richard00To99)
    })
    afterAll(async () => {
      await mongoTestContainer.closeDatabase()
    })
    afterEach(async () => {
      await mongoTestContainer.clearDatabase()
    })
    it('should reply 200 with a user object when username is richard_01', async () => {
      //arrange
      const username = 'richard_01'
      const request = new Request(`http://localhost/api/v1/users/${username}`)
      const params = { params: { username } }
      //act
      const response = await GET(request, params)
      //assert
      const status = response.status
      const rawData = await response.json()
      const data = S.parseSync(User.schema)(rawData)
      expect(status).toBe(200)
      expect(data.name).toBe(username)
    })
    it('should reply 404 when username is richard_x', async () => {
      //arrange
      const username = 'richard_x'
      const request = new Request(`http://localhost/api/v1/users/${username}`)
      const params = { params: { username } }
      //act
      const response = await GET(request, params)
      //assert
      expect(response.status).toBe(404)
    })
  })
  describe('in the case of database connecting failure', () => {
    beforeAll(async () => {
      vi.stubEnv('DB_URI', 'mongodb://localhost:54321')
    })

    it('should reply 500', async () => {
      //arrange
      const username = 'richard_01'
      const request = new Request(`http://localhost/api/v1/users/${username}`)
      const params = { params: { username } }
      //act
      const response = await GET(request, params)
      //assert
      expect(response.status).toBe(500)
    })
  })
})
