'use client'

import { textsAtom } from '@/app/atoms'
import { SideMenu } from '@/app/components/side-menu'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { CourseName } from './components/course-name'
import { DateRange } from './components/date-range'
import { Description } from './components/description'
import { Footer } from './components/footer'
import { UsersField } from './components/users-field'

const AddCourseForm: FC = () => {
  const texts = useAtomValue(textsAtom)
  return (
    <SideMenu
      title={texts.addCourseForm.title}
      className="w-[500px]"
      Footer={Footer}
    >
      <CourseName />
      <DateRange />
      <Description />
      <UsersField />
    </SideMenu>
  )
}

export default AddCourseForm
