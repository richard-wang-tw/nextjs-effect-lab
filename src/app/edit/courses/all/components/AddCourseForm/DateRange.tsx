import { DateRangePicker } from '@/components/DateRangePicker'

export const DateRange = () => (
  <div>
    <label
      data-for="default-input"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Date Range
    </label>
    <DateRangePicker />
  </div>
)
