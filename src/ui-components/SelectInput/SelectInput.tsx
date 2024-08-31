'use client'
import { FunctionComponent, memo, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Input } from '@/ui-components'
import { FoundUser } from '@/common/types'
import { InputProps } from '../Input/Input'

type SelectInputProps = {
  onSuccessFind?: (value: FoundUser | null) => void
  setValue?: (value: string) => void
  data?: Array<any>
  isLoading?: boolean
} & InputProps

const SelectInput: FunctionComponent<SelectInputProps> = ({
  data,
  value,
  isLoading,
  setValue,
  onSuccessFind,
  ...inputProps
}) => {
  const t = useTranslations('ui-components')

  // const inputRef = useRef<HTMLInputElement>(null)
  // const listRef = useRef<HTMLDivElement>(null)

  const [edited, setEdited] = useState<boolean>(false)
  const [isInputActive, setIsInputActive] = useState(false)

  // useEffect(() => {
  //   if (typeof document === 'undefined') return;

  //   const handleFocus = () => {
  //     if (document.activeElement === inputRef.current) {
  //       setIsInputActive(true)
  //     } else {
  //       setIsInputActive(false)
  //     }
  //   }

  //   document.addEventListener('focusin', handleFocus)
  //   document.addEventListener('focusout', handleFocus)

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener('focusin', handleFocus)
  //     document.removeEventListener('focusout', handleFocus)
  //   }
  // }, [])

  // const options =
  //   data &&
  //   data.map((item: FoundUser) => (
  //     <div
  //       key={item.id}
  //       onClick={() => {
  //         onSuccessFind?.(item)
  //         setValue?.(`${item.name} ${item.surname}`)
  //         setEdited(false)
  //       }}
  //       className="cursor-pointer px-3 py-3 hover:bg-gray-300"
  //     >{`${item.name} ${item.surname}`}</div>
  //   ))

  // useEffect(() => {
  //   const handleClickOutside = (event: Event) => {
  //     if (
  //       listRef.current &&
  //       !listRef.current.contains(event.target as Node)
  //     ) {
  //       if (edited) {
  //         setValue?.('')
  //         setEdited(false)
  //         onSuccessFind?.(null)
  //       }
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [value, setValue, edited, onSuccessFind])

  // const handleChange = (value: string) => {
  //   setValue?.(value)
  //   setEdited(true)
  // }

  return (
    <div className="relative" >
      {/* <Input
        inputRef={inputRef}
        className="w-full"
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
      {isInputActive && (
        <div className="absolute w-full bg-white max-h-[9rem] top-[5.75rem] dark:bg-dark-100 rounded overflow-y-auto z-50">
          {!isLoading ? (
            options
          ) : (
            <div className="flex justify-center items-center h-[6rem]">
              {t('loading')}
            </div>
          )}
        </div>
      )} */}
    </div>
  )
}

export default memo(SelectInput)
