import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class TextInputLimit extends S.Class<TextInputLimit>()({
  _tag: S.literal('TextInputLimit'),
  minLen: S.number,
  maxLen: S.number,
}) {
  static of = Data.tagged<TextInputLimit>('TextInputLimit')
}

export class TextInputEvent extends S.Class<TextInputEvent>()({
  _tag: S.literal('TextInputEvent'),
  value: S.string,
  limit: TextInputLimit,
}) {
  static is = S.is(TextInputEvent.struct)
  static of = (limit: TextInputLimit) => (value: string) =>
    Data.tagged<TextInputEvent>('TextInputEvent')({ limit, value })
}
