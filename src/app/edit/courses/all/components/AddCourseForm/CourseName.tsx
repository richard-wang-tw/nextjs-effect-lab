import { constantsAtom } from '@/app/data/service/atoms'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import {
  courseNameAtom,
  textInputOfEvent,
} from '../../data/addCourseForm/textInput'
import { ErrorMessage } from './common/ErrorMessage'
import { Label } from './common/Label'
import { TextInput } from './common/TextInput'

export const CourseName = () => {
  const [courseName, setCourseName] = useAtom(courseNameAtom)
  const { texts, settings } = useAtomValue(constantsAtom)
  const { title, placeholder } = texts.addCourseForm.courseName
  const { limit } = settings.courseName
  return (
    <div>
      <Label htmlFor="course-name">{title}</Label>
      <TextInput
        value={courseName.value}
        onChange={flow(textInputOfEvent(limit), setCourseName)}
        onBlur={flow(textInputOfEvent(limit), setCourseName)}
        id="course-name"
        placeholder={placeholder}
      />
      <ErrorMessage {...courseName} />
    </div>
  )
}
