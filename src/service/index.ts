import { Clock } from './clock'
import { Contracts } from './contracts'
import { Settings } from './settings'
import { Texts } from './texts'

export interface Constants {
  settings: Settings
  texts: Texts
}

export interface Functions {
  clock: Clock
  contracts: Contracts
}

export interface Service extends Constants, Functions {}
