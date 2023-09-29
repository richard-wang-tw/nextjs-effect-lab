import { Data, Option } from 'effect'
import { NonEmptyReadonlyArray } from 'effect/ReadonlyArray'
import { atom } from 'jotai'

export const participantOf = Data.tagged<Participant>('Participant')
export const administratorOf = Data.tagged<Administrator>('Administrator')

export interface Administrator extends Data.Case {
  _tag: 'Administrator'
  name: string
}

export interface Participant extends Data.Case {
  _tag: 'Participant'
  name: string
}

export type User = Administrator | Participant

export interface Users extends NonEmptyReadonlyArray<User> {}

export const usersAtom = atom<Option.Option<Users>>(Option.none())
