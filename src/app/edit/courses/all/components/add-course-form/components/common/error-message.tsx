import { RequestError } from '@/app/data/error/request-error'
import { ValidateError } from '@/app/data/error/validate-error'
import * as Match from '@effect/match'
import { pipe } from 'effect'
import { FC } from 'react'
import { InvalidDateRange } from '../../../../data/states/add-course-form/date-range'
import { InvalidTextInput } from '../../../../data/states/add-course-form/text-input'
import { InvalidUsersField } from '../../../../data/states/add-course-form/users-field/invalid'
const Displayed: FC<{ reason: string }> = ({ reason }) => (
  <p className={'error-message h-5 text-sm text-red-600 dark:text-red-500'}>
    {reason}
  </p>
)

export const ErrorMessage: FC<{
  error:
    | InvalidDateRange
    | InvalidTextInput
    | ValidateError
    | RequestError
    | InvalidUsersField
}> = ({ error }) =>
  pipe(
    Match.value(error),
    Match.tag('InvalidTextInput', ({ reason }) => (
      <Displayed reason={reason} />
    )),
    Match.tag('InvalidDateRange', ({ reason }) => (
      <Displayed reason={reason} />
    )),
    Match.tag('RequestNotFoundError', () => (
      <Displayed reason={'user not found'} />
    )),
    Match.tag('ValidateError', () => (
      <Displayed reason={'something went wrong ... QAQ'} />
    )),
    Match.tag('UnexpectedRequestError', () => (
      <Displayed reason={'something went wrong ... QAQ'} />
    )),
    Match.tag('UnexpectedAxiosError', () => (
      <Displayed reason={'something went wrong ... QAQ'} />
    )),
    Match.tag('InvalidUsersField', () => (
      <Displayed reason={'please select as least 1 user'} />
    )),
    Match.exhaustive
  )
