import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const initWorker = (url: string) => setupWorker(...handlers(url))
