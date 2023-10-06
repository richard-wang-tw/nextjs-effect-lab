import { setupServer } from 'msw/node'
import { handlers } from './handler'

export const initServer = (url: string) => setupServer(...handlers(url))
