import { flow } from 'effect/Function'
import { useAtom } from 'jotai'
import {
  courseNameAtom,
  textInputOfEvent,
} from '../../data/addCourseForm/textInput'
import { ErrorMessage } from './common/ErrorMessage'
import { Label } from './common/Label'
import { TextInput } from './common/TextInput'

const limit = { minLen: 1, maxLen: 50 }

export const CourseName = () => {
  const [courseName, setCourseName] = useAtom(courseNameAtom)

  return (
    <div>
      <Label htmlFor="course-name">Course Name</Label>
      <TextInput
        value={courseName.value}
        onChange={flow(textInputOfEvent(limit), setCourseName)}
        onBlur={flow(textInputOfEvent(limit), setCourseName)}
        id="course-name"
        placeholder="Enter course name"
      />
      <ErrorMessage {...courseName} />
    </div>
  )
}
