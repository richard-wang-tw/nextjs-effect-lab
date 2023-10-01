import { constantsAtom } from '@/app/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { courseNameAtom } from '../../../../atoms'
import { TextInputLimit } from '../../../../data/events/text-input-event'
import { Label } from '../common/label'
import { TextInput } from '../common/text-input'

export const CourseName = () => {
  const [courseName, setCourseName] = useAtom(courseNameAtom)
  const { texts, settings } = useAtomValue(constantsAtom)
  const { title, placeholder } = texts.addCourseForm.courseName
  const { limit } = settings.courseName
  const id = 'course-name'
  return (
    <div>
      <Label htmlFor={id}>{title}</Label>
      <TextInput
        textInput={courseName}
        setTextInput={setCourseName}
        id={id}
        placeholder={placeholder}
        limit={TextInputLimit.of(limit)}
        title={title}
      />
    </div>
  )
}
