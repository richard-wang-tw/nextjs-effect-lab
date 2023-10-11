import { Contracts } from '@/service/contracts'
import { atom } from 'jotai'
import { Constants, Functions, Service } from '../service'
import { Clock } from '../service/clock'
import { Settings } from '../service/settings'
import { Texts } from '../service/texts'

export const settingsAtom = atom<Settings>(Settings.default)

export const textsAtom = atom<Texts>(Texts.default)

export const clockAtom = atom<Clock>(Clock.default)

export const contractsAtom = atom<Contracts>(Contracts.default)

export const functionsAtom = atom(
  (get): Functions => ({
    clock: get(clockAtom),
    contracts: get(contractsAtom),
  }),
  (_, set, functions: Functions) => {
    const { clock, contracts } = functions
    set(clockAtom, clock)
    set(contractsAtom, contracts)
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
  (_, set, service: Service) => {
    const { settings, texts, clock, contracts } = service
    set(constantsAtom, { settings, texts })
    set(functionsAtom, { clock, contracts })
  }
)
