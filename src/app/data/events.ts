import * as S from '@effect/schema/Schema'

export class Nothing extends S.Class<Nothing>()({
  _tag: S.literal('Nothing'),
}) {
  static self = new Nothing({ _tag: 'Nothing' })
  static is = S.is(Nothing.struct)
}
