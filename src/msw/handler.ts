import { getUsersByNameHandler } from './endpoints/get-user-by-name'

export const handlers = (baseUrl: string) => [
  getUsersByNameHandler(baseUrl)('200 admin'),
]
