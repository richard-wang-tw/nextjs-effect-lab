import * as S from '@effect/schema/Schema'

export class MongooseExConnectError extends S.Class<MongooseExConnectError>()({
  _tag: S.literal('MongooseExConnectError'),
  error: S.string,
}) {
  static of = (error: unknown) =>
    new MongooseExConnectError({
      _tag: 'MongooseExConnectError',
      error: String(error),
    })
}
