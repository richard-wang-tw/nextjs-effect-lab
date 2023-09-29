import { constantsAtom } from '@/app/data/service/atoms'
import { Button } from '@/components/Button'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

export const UserInput = () => {
  const { texts } = useAtomValue(constantsAtom)
  const [input, setInput] = useState('')
  const { placeholder, addButton } = texts.addCourseForm.users.input

  return (
    <div className="relative">
      <input
        value={input}
        type="search"
        id="search"
        className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {}}
      />
      <Button className="absolute right-1.5 bottom-1.5 px-2 py-1">
        {addButton.text}
      </Button>
    </div>
  )
}
