'use client'
import { FunctionComponent, memo, useState } from 'react'
import DatePickerCom from 'react-datepicker'

import { Validation } from '@/common/types'
import { formatDate } from '@/common/utils'
import { FieldErrors } from '@/ui-components'
import { getUniqueId } from '@/common/utils'

import 'react-datepicker/dist/react-datepicker.css'

type InputProps = {
  label?: string
  placeholder?: string
  validation?: Validation
  value: string
  className?: string
  setValue: (value: string) => void
}

const DatePicker: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  setValue,
  className,
  validation,
}) => {
  const id = getUniqueId('datePicker')

  const [date, setDate] = useState<Date | null>(null)

  const handleSelect = (d: Date) => setValue(formatDate(d, '/'))

  const handleChange = (d: Date) => {
    if (d) setDate(d)
  }

  const handleChangeRow = (value: string) => {
    if (value) setValue(value)
  }

  return (
    <div className="flex flex-col font-[ceraProLight]">
      <label htmlFor={id} className="dark:text-white">
        {label}
      </label>
      <DatePickerCom
        id={id}
        placeholderText={placeholder}
        selected={date}
        value={value}
        onSelect={(value) => handleSelect(value as Date)}
        onChange={(value) => handleChange(value as Date)}
        onChangeRaw={(event) => handleChangeRow((event?.target as HTMLInputElement).value)}
        showYearDropdown
        showMonthDropdown
        dateFormat="yyyy/MM/dd"
        dropdownMode="select"
        className={`
            min-w-[10rem] bg-white flex align-center gap-3 py-3 dark:text-white
            px-4 text-base rounded-md border border-strock mt-2 dark:bg-dark-100
            ${className} ${validation && !validation?.isValid && '!border-red'}
          `}
      />
      <FieldErrors isValid={!!validation?.isValid} errors={validation?.errors} />
    </div>
  )
}

export default memo(DatePicker)
