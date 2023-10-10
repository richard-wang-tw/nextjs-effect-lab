'use client'

import { DateRangePicker as Picker } from '@richard-wang-tw/flowbite-datepicker'
import { FC, useEffect, useRef } from 'react'
import { Calender } from './icons'

export interface DateRangePickerEvent {
  start?: Date
  end?: Date
}

export interface DateRangePickerProps {
  onChange?: (event: DateRangePickerEvent) => void
  id?: string
  placeholder?: {
    start: string
    end: string
  }
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  onChange,
  id,
  placeholder,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    new Picker(pickerRef.current, {
      format: 'yyyy / mm / dd',
      onChange,
    })
  }, [])

  return (
    <div ref={pickerRef} className="flex items-center w-full" id={id}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calender className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          name="start"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder?.start}
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
          placeholder={placeholder?.end}
        />
      </div>
    </div>
  )
}
