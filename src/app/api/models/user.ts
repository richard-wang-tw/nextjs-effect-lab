import { TransformError } from '@/app/data/error/transform-error'
import { Administrator, Participant, User } from '@/app/data/user'
import * as M from '@effect/match'
import { Either, pipe } from 'effect'
import mongoose from 'mongoose'

const mongooseSchema: mongoose.Schema = new mongoose.Schema<UserDocument>({
  role: String,
  name: String,
})

const of =
  (name: string) =>
  (role: string): UserDocument => ({
    role,
    name,
  })

const toUser = (doc: UserDocument): Either.Either<TransformError, User> =>
  pipe(
    M.value(doc.role),
    M.when('Administrator', () => Either.right(Administrator.of(doc.name))),
    M.when('Participant', () => Either.right(Participant.of(doc.name))),
    M.orElse(() =>
      Either.left(
        TransformError.of({
          from: 'UserDocument',
          to: 'User',
          message: 'role should be Administrator or Participant',
        })
      )
    )
  )

const fromUser = (user: User) =>
  pipe(
    M.value(user._tag),
    M.when('Administrator', of(user.name)),
    M.when('Participant', of(user.name)),
    M.exhaustive
  )

export const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', mongooseSchema)

export interface UserDocument {
  role: string
  name: string
}

export const UserDocument = {
  of,
  toUser,
  fromUser,
}
