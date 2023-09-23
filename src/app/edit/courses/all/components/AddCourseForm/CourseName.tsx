import { flow } from 'effect/Function'
import { useAtom } from 'jotai'
import {
  courseNameAtom,
  textInputOfEvent,
} from '../../data/addCourseForm/textInput'
import { ErrorMessage } from './common/ErrorMessage'

const limit = { minLen: 1, maxLen: 50 }

export const CourseName = () => {
  const [textInput, setTextInput] = useAtom(courseNameAtom)

  return (
    <div>
      <label
        data-for="course-name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Course Name
      </label>
      <input
        value={textInput.value}
        onChange={flow(textInputOfEvent(limit), setTextInput)}
        onBlur={flow(textInputOfEvent(limit), setTextInput)}
        type="text"
        id="course-name"
        placeholder="Enter course name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ErrorMessage {...textInput} />
    </div>
  )
}
