import { Match, pipe } from 'effect'
import { FC } from 'react'
import { DateRange, InvalidDateRange } from '../date-range/data'
import { InvalidTextInput, TextInput } from './text-input/data'

const Displayed: FC<InvalidTextInput | InvalidDateRange> = ({ reason }) => (
  <p className={'error-message h-5 text-sm text-red-600 dark:text-red-500'}>
    {reason}
  </p>
)

export const ErrorMessage: FC<TextInput | DateRange> = (input) =>
  pipe(
    Match.value(input),
    Match.tag('InvalidTextInput', (input) => <Displayed {...input} />),
    Match.tag('InvalidDateRange', (input) => <Displayed {...input} />),
    Match.orElse(() => <></>)
  )
