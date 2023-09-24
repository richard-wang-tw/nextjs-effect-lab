import { texts } from './en'

type _Texts = typeof texts

export interface Texts extends _Texts {}

const map = {
  en: (): Promise<Texts> => import('./en').then((module) => module.texts),
}

export const importTexts = (locale: keyof typeof map): Promise<Texts> =>
  map[locale]()
