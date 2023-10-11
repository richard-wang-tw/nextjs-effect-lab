import { defaultSettings } from './default'

type _Settings = typeof defaultSettings

export interface Settings extends _Settings {}

const map = {
  default: (): Promise<Settings> =>
    import('./default').then((module) => module.defaultSettings),
}

const importSettings = (key: keyof typeof map): Promise<Settings> => map[key]()

export const Settings = {
  import: importSettings,
  default: defaultSettings,
}
