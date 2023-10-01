import { rest } from 'msw'
import { getUser200 } from './resolvers/get-user'

export const handlers = (url: string) => [
  rest.get(url + '/api/v1/users/:username', getUser200),
]
