import { Env } from '@/service/env'
import { Effect } from 'effect'
import connect from './connect'
import { MongooseExConnectError } from './error'

interface MongooseEx {
  connect: (env: Env) => Effect.Effect<never, MongooseExConnectError, void>
}

const MongooseEx: MongooseEx = {
  connect,
}

export default MongooseEx
