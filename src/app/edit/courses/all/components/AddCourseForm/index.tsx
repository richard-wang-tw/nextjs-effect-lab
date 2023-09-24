'use client'

import { textsAtom } from '@/app/data/service/atoms'
import { SideMenu } from '@/components/SideMenu'
import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { CourseName } from './CourseName'
import { DateRange } from './DateRange'
import { Description } from './Description'
import { Footer } from './Footer'
import { Users } from './Users'

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
