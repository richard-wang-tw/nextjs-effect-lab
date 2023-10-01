import { Clock } from './clock'
import { Settings } from './settings'
import { Texts } from './texts'

export interface Constants {
  settings: Settings
  texts: Texts
}

export interface Functions {
  clock: Clock
}

export interface Service extends Constants, Functions {}
