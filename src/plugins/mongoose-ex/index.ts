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

const opts: mongoose.ConnectOptions = {
  bufferCommands: false,
}

const _connect = async (uri: string): Promise<void> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, opts)
  }

  try {
    cached.conn = await cached.promise
    console.log('connected')
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

const connect = (env: Env) =>
  pipe(
    Effect.tryPromise({
      try: () => _connect(env.DB_URI),
      catch: MongooseExConnectError.of,
    })
  )

interface MongooseEx {
  connect: (env: Env) => Effect.Effect<never, MongooseExConnectError, void>
}

const MongooseEx: MongooseEx = {
  connect,
}

export default MongooseEx
