import { SetState } from '@/app/data/utils/hooks'
import {
  TextInputEvent,
  TextInputLimit,
} from '@/app/edit/courses/all/data/events/text-input-event'
import { TextInput as TextInputState } from '@/app/edit/courses/all/data/states/add-course-form/text-input'
import * as M from '@effect/match'
import { pipe } from 'effect/Function'
import { ChangeEvent, FC, FocusEvent } from 'react'
import { ErrorMessage } from '../error-message'

const Error: FC<{ input: TextInputState }> = ({ input }) =>
  pipe(
    M.value(input),
    M.tag('InvalidTextInput', (error) => <ErrorMessage error={error} />),
    M.orElse(() => <></>)
  )

type Props = {
  limit: TextInputLimit
  title: string
  textInput: TextInputState
  placeholder: string
  id: string
  setTextInput: SetState<TextInputState>
}

const onChange =
  (setTextInput: SetState<TextInputState>) =>
  (limit: TextInputLimit) =>
  (event: ChangeEvent<HTMLInputElement>) =>
    pipe(
      event.target.value,
      TextInputEvent.of(limit),
      TextInputState.on,
      setTextInput
    )
const onBlur =
  (setTextInput: SetState<TextInputState>) =>
  (limit: TextInputLimit) =>
  (event: FocusEvent<HTMLInputElement>) =>
    pipe(
      event.target.value,
      TextInputEvent.of(limit),
      TextInputState.on,
      setTextInput
    )

export const TextInput: FC<Props> = (props) => {
  const { textInput, placeholder, id, setTextInput, limit } = props
  return (
    <>
      <input
        value={textInput.value}
        placeholder={placeholder}
        id={id}
        onBlur={onBlur(setTextInput)(limit)}
        onChange={onChange(setTextInput)(limit)}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <Error input={textInput} />
    </>
  )
}
