'use client'

import { textsAtom } from '@/app/data/service/atoms'
import { SideMenu } from '@/components/SideMenu'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { CourseName } from './course-name'
import { DateRange } from './date-range'
import { Description } from './description'
import { Footer } from './footer'
import { Users } from './users'

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
      <Users />
    </SideMenu>
  )
}

export default AddCourseForm
