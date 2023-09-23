import { Match, pipe } from 'effect'
import { FC } from 'react'
import {
  InvalidTextInput,
  TextInput,
} from '../../../data/addCourseForm/textInput'

const Displayed: FC<InvalidTextInput> = ({ reason }) => (
  <p className={'error-message h-5 text-sm text-red-600 dark:text-red-500'}>
    {reason}
  </p>
)

export const ErrorMessage: FC<TextInput> = (input) =>
  pipe(
    Match.value(input),
    Match.tag('InvalidTextInput', (input) => <Displayed {...input} />),
    Match.tag('InitialTextInput', (input) => <></>),
    Match.tag('ValidTextInput', (input) => <></>),
    Match.exhaustive
  )
