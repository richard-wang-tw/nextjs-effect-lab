import { constantsAtom } from '@/app/data/service/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { ErrorMessage } from '../common/error-message'
import { Label } from '../common/label'
import { TextInput } from '../common/text-input'
import { descriptionAtom } from '../common/text-input/data'

export const Description = () => {
  const [description, setDescription] = useAtom(descriptionAtom)
  const { texts, settings } = useAtomValue(constantsAtom)
  const { title, placeholder } = texts.addCourseForm.description
  const { limit } = settings.courseDescription
  const id = 'course-description'
  return (
    <div>
      <Label htmlFor={id}>{title}</Label>
      <TextInput
        id={id}
        placeholder={placeholder}
        limit={limit}
        title={title}
        textInput={description}
        setTextInput={setDescription}
      />
      <ErrorMessage {...description} />
    </div>
  )
}
