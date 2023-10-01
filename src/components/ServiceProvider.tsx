'use client'

import { Constants } from '@/service'
import { constantsAtom } from '@/service/atoms'
import { useHydrateAtoms } from 'jotai/utils'
import { FC } from 'react'
export const ServiceProvider: FC<Constants> = (constants) => {
  useHydrateAtoms([[constantsAtom, constants]])
  return <></>
}
