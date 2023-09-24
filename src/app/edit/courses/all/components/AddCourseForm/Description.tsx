import { flow } from 'effect/Function'
import { useAtom } from 'jotai'
import {
  descriptionAtom,
  textInputOfEvent,
} from '../../data/addCourseForm/textInput'
import { ErrorMessage } from './common/ErrorMessage'
import { Label } from './common/Label'
import { TextInput } from './common/TextInput'

const limit = { minLen: 1, maxLen: 500 }

export const Description = () => {
  const [description, setDescription] = useAtom(descriptionAtom)

  return (
    <div>
      <Label htmlFor="description">Description</Label>
      <TextInput
        value={description.value}
        onChange={flow(textInputOfEvent(limit), setDescription)}
        onBlur={flow(textInputOfEvent(limit), setDescription)}
        id="description"
        placeholder="Enter description"
      />
      <ErrorMessage {...description} />
    </div>
  )
}
