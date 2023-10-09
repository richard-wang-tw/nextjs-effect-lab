import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class TransformError extends S.Class<TransformError>()({
  _tag: S.literal('TransformError'),
  from: S.string,
  to: S.string,
  message: S.string,
}) {
  static of = Data.tagged<TransformError>('TransformError')
}
