import { atom } from 'jotai'
import {
  DateRange,
  InitialDateRange,
} from './data/states/add-course-form/date-range'
import {
  InitialTextInput,
  TextInput,
} from './data/states/add-course-form/text-input'
import { UsersField } from './data/states/add-course-form/users-field'
import { InitialUsersField } from './data/states/add-course-form/users-field/initial'

export const dateRangeAtom = atom<DateRange>(InitialDateRange.self)
export const courseNameAtom = atom<TextInput>(InitialTextInput.self)
export const descriptionAtom = atom<TextInput>(InitialTextInput.self)
export const usersFieldAtom = atom<UsersField>(InitialUsersField.self)
