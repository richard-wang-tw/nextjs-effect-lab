'use client'

import { constantsAtom } from '@/app/atoms'
import { Constants } from '@/service'
import { useHydrateAtoms } from 'jotai/utils'
import { FC } from 'react'
export const ServiceProvider: FC<Constants> = (constants) => {
  useHydrateAtoms([[constantsAtom, constants]])
  return <></>
}
