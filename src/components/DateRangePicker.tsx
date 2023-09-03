'use client'

import { DateRangePicker as FlowbiteDateRangePicker } from '@richard-wang-tw/flowbite-datepicker'
import { useEffect, useRef } from 'react'
import { Calender } from './icons'

export const DateRangePicker = () => {
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    new FlowbiteDateRangePicker(pickerRef.current)
  })

  return (
    <div ref={pickerRef} className="flex items-center w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calender className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          name="start"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select start date"
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calender className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          datepicker-buttons="true"
          name="end"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select end date"
        />
      </div>
    </div>
  )
}
