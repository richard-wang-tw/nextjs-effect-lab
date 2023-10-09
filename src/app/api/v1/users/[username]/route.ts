import { matchErrors } from '@/app/api/common/matchErrors'
import { UserDocument, UserModel } from '@/app/api/models/user'
import {
  DatabaseNotFoundError,
  DatabaseUnexpectedError,
} from '@/app/data/error/database-error'
import MongooseEx from '@/plugins/mongoose-ex'
import { Env } from '@/service/env'
import { Effect, Either, pipe } from 'effect'
import { NextResponse } from 'next/server'

interface Route {
  params: { username: string }
}
const findOneUser = (name: string) => () =>
  Effect.tryPromise({
    try: () => UserModel.findOne<UserDocument>({ name }).exec(),
    catch: (error) =>
      DatabaseUnexpectedError.of({
        error: error,
        model: 'UserModel',
        action: 'findOne',
      }),
  })

const validateFounded = Either.fromNullable<
  UserDocument | null,
  DatabaseNotFoundError
>(() =>
  DatabaseNotFoundError.of({
    model: 'UserModel',
    action: 'findOne',
  })
)

export const GET = async (_: Request, route: Route): Promise<NextResponse> =>
  pipe(
    Env.of(process.env),
    Effect.flatMap(MongooseEx.connect),
    Effect.flatMap(findOneUser(route.params.username)),
    Effect.flatMap(validateFounded),
    Effect.flatMap(UserDocument.toUser),
    Effect.match({
      onFailure: matchErrors,
      onSuccess: NextResponse.json,
    }),
    Effect.runPromise
  )
