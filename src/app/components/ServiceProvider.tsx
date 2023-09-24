'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { FC } from 'react'
import { Constants } from '../data/service'
import { constantsAtom } from '../data/service/atoms'

export const ServiceProvider: FC<Constants> = (constants) => {
  useHydrateAtoms([[constantsAtom, constants]])
  return <></>
}
