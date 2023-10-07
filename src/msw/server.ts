import { setupServer } from 'msw/node'
import { handlers } from './handler'

export const defaultServer = (url: string) => setupServer(...handlers(url))
