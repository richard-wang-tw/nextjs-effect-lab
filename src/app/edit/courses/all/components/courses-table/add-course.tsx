import { Button } from '@/app/components/button'
import { PlusCircle } from '@/app/components/icons'

export const AddCourse = () => (
  <div className="flex flex-row justify-end items-center w-full">
    <div className="flex flex-row items-center gap-2">
      <Button theme="light" className="flex items-center gap-2">
        <PlusCircle />
        Add Course
      </Button>
    </div>
  </div>
)
