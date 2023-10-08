/**
 * @vitest-environment edge-runtime
 */

import { UserModel } from '@/app/api/models/user'
import { User } from '@/app/data/user'
import MongooseEx from '@/plugins/mongoose-ex'
import * as S from '@effect/schema/Schema'
import { ReadonlyArray as RA, pipe } from 'effect'
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

const richard00To99: UserModel[] = pipe(
  RA.replicate(100)(''),
  RA.map((_, i) => `0${i}`.slice(-2)),
  RA.map((index) => ({
    name: `richard_${index}`,
    role: 'Administrator',
  }))
)

describe('GET /api/v1/users/[username]', () => {
  let mongoTestContainer: StartedMongoTestContainer
  beforeAll(async () => {
    mongoTestContainer = await startedMongoTestContainerOf('mongo:7.0.0')
    const mongoUri = mongoTestContainer.getUri()
    vi.stubEnv('DB_URI', mongoUri)
    await MongooseEx.connect(mongoUri)
    await UserModel.insertMany(richard00To99)
  })
  afterAll(async () => {
    await mongoTestContainer.closeDatabase()
  })
  afterEach(async () => {
    await mongoTestContainer.clearDatabase()
  })

  describe('when exists user richard_00 to richard_99', () => {
    it('should reply a user when username is richard_01', async () => {
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
  })
})
