import { Dispatch, SetStateAction } from 'react'

export type UseState<T> = [T, Dispatch<SetStateAction<T>>]

export type SetState<T> = Dispatch<SetStateAction<T>>
