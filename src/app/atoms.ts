import { Contracts, contracts } from '@/service/contracts'
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

export const contractsAtom = atom<Contracts>(contracts)

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
