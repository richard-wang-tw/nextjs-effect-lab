import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const initServer = (url: string) => setupServer(...handlers(url))
