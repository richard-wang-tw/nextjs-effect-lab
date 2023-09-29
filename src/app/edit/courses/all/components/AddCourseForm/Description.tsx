import { constantsAtom } from '@/app/data/service/atoms'
import { flow } from 'effect/Function'
import { useAtom, useAtomValue } from 'jotai'
import {
  descriptionAtom,
  textInputOfEvent,
} from '../../data/addCourseForm/textInput'
import { ErrorMessage } from './common/ErrorMessage'
import { Label } from './common/Label'
import { TextInput } from './common/TextInput'

export const Description = () => {
  const [description, setDescription] = useAtom(descriptionAtom)
  const { texts, settings } = useAtomValue(constantsAtom)
  const { title, placeholder } = texts.addCourseForm.description
  const { limit } = settings.courseDescription
  return (
    <div>
      <Label htmlFor="course-description">{title}</Label>
      <TextInput
        value={description.value}
        onChange={flow(textInputOfEvent(limit), setDescription)}
        onBlur={flow(textInputOfEvent(limit), setDescription)}
        id="course-description"
        placeholder={placeholder}
      />
      <ErrorMessage {...description} />
    </div>
  )
}
