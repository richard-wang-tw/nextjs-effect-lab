import { Env } from '@/service/env'
import { Effect, pipe } from 'effect'
import mongoose from 'mongoose'
import { MongooseExConnectError } from './error'
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const _connect = async (uri: string): Promise<void> => {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
}

const connect = (env: Env) =>
  pipe(
    Effect.tryPromise({
      try: () => _connect(env.DB_URI),
      catch: MongooseExConnectError.of,
    })
  )

export default connect
