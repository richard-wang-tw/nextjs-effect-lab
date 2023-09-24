'use client'

import { SideMenu } from '@/components/SideMenu'
import { FC } from 'react'
import { CourseName } from './CourseName'
import { DateRange } from './DateRange'
import { Description } from './Description'
import { Footer } from './Footer'
import { Users } from './Users'

const AddCourseForm: FC = () => (
  <SideMenu title="Add Course" className="w-[500px]" Footer={Footer}>
    <CourseName />
    <DateRange now={() => new Date()} />
    <Description />
    <Users />
  </SideMenu>
)

export default AddCourseForm
