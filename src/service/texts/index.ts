import { textsEn } from './en'

type _Texts = typeof textsEn

export interface Texts extends _Texts {}

const map = {
  en: (): Promise<Texts> => import('./en').then((module) => module.textsEn),
}

const importTexts = (locale: keyof typeof map): Promise<Texts> => map[locale]()

export const Texts = {
  default: textsEn,
  import: importTexts,
}
