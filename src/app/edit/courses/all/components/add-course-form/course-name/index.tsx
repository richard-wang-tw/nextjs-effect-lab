import { constantsAtom } from '@/app/data/service/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { ErrorMessage } from '../common/error-message'
import { Label } from '../common/label'
import { TextInput } from '../common/text-input'
import { courseNameAtom } from '../common/text-input/data'

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
        limit={limit}
        title={title}
      />
      <ErrorMessage {...courseName} />
    </div>
  )
}
