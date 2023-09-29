import { Data } from 'effect'

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
