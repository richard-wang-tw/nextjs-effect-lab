import { Nothing } from '@/app/data/events'
import { User } from '@/app/data/user'
import * as S from '@effect/schema/Schema'
import { Data } from 'effect'

export class AddUserEvent extends S.Class<AddUserEvent>()({
  _tag: S.literal('AddUserEvent'),
}) {
  static self = new AddUserEvent({ _tag: 'AddUserEvent' })
  static is = S.is(AddUserEvent)
}

export class DeleteUserEvent extends S.Class<DeleteUserEvent>()({
  _tag: S.literal('DeleteUserEvent'),
  user: User.schema,
}) {
  static of = (user: User) =>
    Data.tagged<DeleteUserEvent>('DeleteUserEvent')({ user })
  static is = S.is(DeleteUserEvent.struct)
}

export class UpdateInputEvent extends S.Class<UpdateInputEvent>()({
  _tag: S.literal('UpdateInputEvent'),
  input: S.string,
}) {
  static of = (input: string) =>
    Data.tagged<UpdateInputEvent>('UpdateInputEvent')({ input })
  static is = S.is(UpdateInputEvent.struct)
}

export type UsersFieldEvent =
  | AddUserEvent
  | DeleteUserEvent
  | UpdateInputEvent
  | Nothing
