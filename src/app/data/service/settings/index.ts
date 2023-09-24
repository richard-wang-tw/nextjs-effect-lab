import { settings } from './default'

type _Settings = typeof settings

export interface Settings extends _Settings {}

const map = {
  default: (): Promise<Settings> =>
    import('./default').then((module) => module.settings),
}

export const importSettings = (key: keyof typeof map): Promise<Settings> =>
  map[key]()
