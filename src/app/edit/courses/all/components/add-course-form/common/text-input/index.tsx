import { SetState } from '@/lib/utils/hooks'
import { flow } from 'effect/Function'
import { FC } from 'react'
import { TextInput as TextInputData, TextInputLimit, textInputOf } from './data'

type Props = {
  limit: TextInputLimit
  title: string
  textInput: TextInputData
  placeholder: string
  id: string
  setTextInput: SetState<TextInputData>
}

export const TextInput: FC<Props> = (props) => {
  const { textInput, placeholder, id, setTextInput, limit } = props
  return (
    <input
      value={textInput.value}
      placeholder={placeholder}
      id={id}
      onBlur={flow(textInputOf(limit), setTextInput)}
      onChange={flow(textInputOf(limit), setTextInput)}
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  )
}
