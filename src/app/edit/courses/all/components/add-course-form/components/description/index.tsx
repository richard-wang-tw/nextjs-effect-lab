import { constantsAtom } from '@/app/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { descriptionAtom } from '../../../../atoms'
import { TextInputLimit } from '../../../../data/events/text-input-event'
import { Label } from '../common/label'
import { TextInput } from '../common/text-input'

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
        limit={TextInputLimit.of(limit)}
        title={title}
        textInput={description}
        setTextInput={setDescription}
      />
    </div>
  )
}
