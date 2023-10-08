import { getUserHandler } from './endpoints/get-user'

export const handlers = (baseUrl: string) => [
  getUserHandler(baseUrl)('exists user richard_00 to richard_99'),
]
