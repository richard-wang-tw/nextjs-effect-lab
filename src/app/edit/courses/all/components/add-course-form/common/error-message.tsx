import * as Match from '@effect/match'
import { pipe } from 'effect'
import { FC } from 'react'
import { DateRange } from '../date-range/data'
import { UsersFieldError } from '../users/data'
import { TextInput } from './text-input/data'
const Displayed: FC<{ reason: string }> = ({ reason }) => (
  <p className={'error-message h-5 text-sm text-red-600 dark:text-red-500'}>
    {reason}
  </p>
)

export const ErrorMessage: FC<TextInput | DateRange | UsersFieldError> = (
  input
) =>
  pipe(
    Match.value(input),
    Match.tag('InvalidTextInput', ({ reason }) => (
      <Displayed reason={reason} />
    )),
    Match.tag('InvalidDateRange', ({ reason }) => (
      <Displayed reason={reason} />
    )),
    Match.tag('NotFoundError', () => <Displayed reason={'user not found'} />),
    Match.tag('ValidateError', () => (
      <Displayed reason={'something went wrong ... QAQ'} />
    )),
    Match.tag('UnexpectedRequestError', () => (
      <Displayed reason={'something went wrong ... QAQ'} />
    )),
    Match.orElse(() => <></>)
  )
