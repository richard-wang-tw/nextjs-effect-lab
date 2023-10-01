import { SetStateAction } from 'jotai'

export type SetAtom<T> = (state: SetStateAction<T>) => void

export type SetState<T> = (state: SetStateAction<T>) => void
