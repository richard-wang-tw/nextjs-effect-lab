import * as S from '@effect/schema/Schema'
export const Method = {
  schema: S.union(
    S.literal('GET'),
    S.literal('POST'),
    S.literal('DELETE'),
    S.literal('PUT')
  ),
}

export type Method = S.Schema.To<typeof Method.schema>
