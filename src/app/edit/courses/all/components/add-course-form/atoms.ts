import { atom } from 'jotai'
import { UsersField } from '../../data/states/add-course-form/users-field'
import { InitialUsersField } from '../../data/states/add-course-form/users-field/initial'

export const usersFieldAtom = atom<UsersField>(InitialUsersField.self)
