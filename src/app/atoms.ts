import { atom } from 'jotai'
import { Constants, Functions, Service } from '../service'
import { Clock, clock } from '../service/clock'
import { Settings } from '../service/settings'
import { settings } from '../service/settings/default'
import { Texts } from '../service/texts'
import { texts } from '../service/texts/en'

export const settingsAtom = atom<Settings>(settings)

export const textsAtom = atom<Texts>(texts)

export const clockAtom = atom<Clock>(clock)

export const functionsAtom = atom(
  (get): Functions => ({
    clock: get(clockAtom),
  }),
  (_, set, { clock }: Functions) => {
    set(clockAtom, clock)
  }
)

export const constantsAtom = atom(
  (get): Constants => ({
    settings: get(settingsAtom),
    texts: get(textsAtom),
  }),
  (_, set, { settings, texts }: Constants) => {
    set(settingsAtom, settings)
    set(textsAtom, texts)
  }
)

export const serviceAtom = atom(
  (get): Service => ({
    ...get(constantsAtom),
    ...get(functionsAtom),
  }),
  (_, set, { settings, texts, clock }: Service) => {
    set(constantsAtom, { settings, texts })
    set(functionsAtom, { clock })
  }
)
