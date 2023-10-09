import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class MongooseExConnectError extends S.Class<MongooseExConnectError>()({
  _tag: S.literal('MongooseExConnectError'),
  error: S.string,
}) {
  static of = (error: unknown) =>
    Data.tagged<MongooseExConnectError>('MongooseExConnectError')({
      error: String(error),
    })
}
