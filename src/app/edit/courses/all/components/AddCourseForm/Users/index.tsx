import { UserBadge } from './UserBadge'
import { UserInput } from './UserInput'

export const Users = () => (
  <div>
    <label
      data-for="default-input"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Users
    </label>
    <div className="flex flex-wrap gap-3 bg-gray-50 rounded-lg border border-gray-300 p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600">
      <UserBadge>Richard</UserBadge>
      <UserBadge>Alice</UserBadge>
      <UserBadge>Bob</UserBadge>
    </div>
    <UserInput />
  </div>
)
