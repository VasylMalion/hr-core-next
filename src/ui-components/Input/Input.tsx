import { FunctionComponent, MutableRefObject, memo } from 'react'

import { Validation } from '@/common/types'
import { getUniqueId } from '@/common/utils'
import { FieldErrors } from '@/ui-components'

export type InputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  validation?: Validation
  type?: string
  inputRef?: MutableRefObject<HTMLInputElement | null>
}

const Input: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  validation,
  type = 'text',
  inputRef,
}) => {
  const id = getUniqueId('input')

  return (
    <div className='font-[ceraProLight]'>
      <label htmlFor={id} className='dark:text-white'>{label}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`
          min-w-[10rem] bg-white flex align-center gap-3 py-3 px-4 dark:text-white
          text-base rounded-md border border-strock mt-2 dark:bg-dark-100
          ${className} ${(validation && !validation?.isValid) && '!border-red'}
        `}
      />
      <FieldErrors isValid={!!validation?.isValid} errors={validation?.errors} />
    </div>
  )
}

export default memo(Input)
