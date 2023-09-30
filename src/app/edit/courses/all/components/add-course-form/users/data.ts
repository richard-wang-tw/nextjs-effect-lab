import { Data, Equal, Match, Option, ReadonlyArray, pipe } from 'effect'
import { NonEmptyReadonlyArray, isNonEmptyArray } from 'effect/ReadonlyArray'
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

export type UsersInputState = { users: Option.Option<Users>; input: string }

export const usersAtom = atom<Option.Option<Users>>(Option.none())

export const userInputAtom = atom<string>('')

export const userInputStateAtom = atom(
  (get) => ({
    users: get(usersAtom),
    input: get(userInputAtom),
  }),
  (_, set, update: UsersInputState) => {
    set(usersAtom, update.users)
    set(userInputAtom, update.input)
  }
)

const _addUser = ({ input, users }: UsersInputState) =>
  pipe(
    users,
    Option.map(ReadonlyArray.append(administratorOf({ name: input }))),
    Option.match({
      onSome: (users): Users => users,
      onNone: (): Users => [administratorOf({ name: input })],
    }),
    (users) => ({ users: Option.some(users), input: '' })
  )

export const addUser =
  (event: unknown) =>
  (state: UsersInputState): Option.Option<UsersInputState> =>
    pipe(
      Match.value(event),
      Match.when({ key: Match.string }, ({ key }) =>
        pipe(
          Match.value(key),
          Match.when('Enter', () => Option.some(_addUser(state))),
          Match.orElse(() => Option.none())
        )
      ),
      Match.orElse(() => Option.some(_addUser(state)))
    )

export const deleteUser =
  (event: User) =>
  (state: Option.Option<Users>): Option.Option<Users> =>
    pipe(
      state,
      Option.map((users) => users.filter((user) => !Equal.equals(user, event))),
      Option.flatMap((users) =>
        isNonEmptyArray(users) ? Option.some(users) : Option.none()
      )
    )
