import { ModelError } from '@/app/data/error/model-error'
import * as M from '@effect/match'
import { pipe } from 'effect'
import { NextResponse } from 'next/server'

const notFound = (error: ModelError) =>
  NextResponse.json(error, { status: 404 })
const internal = (error: ModelError) =>
  NextResponse.json(error, { status: 500 })

export const matchErrors = (error: ModelError) =>
  pipe(
    M.value(error),
    M.tag('DatabaseNotFoundError', notFound),
    M.tag('EnvError', internal),
    M.tag('DatabaseUnexpectedError', internal),
    M.tag('MongooseExConnectError', internal),
    M.tag('TransformError', internal),
    M.exhaustive
  )
