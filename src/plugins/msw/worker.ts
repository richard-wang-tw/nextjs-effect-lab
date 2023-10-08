import { setupWorker } from 'msw'
import { handlers } from './handler'

export const defaultWorker = (url: string) => setupWorker(...handlers(url))
