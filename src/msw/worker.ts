import { setupWorker } from 'msw'
import { handlers } from './handler'

export const initWorker = (url: string) => setupWorker(...handlers(url))
