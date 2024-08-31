import { FunctionComponent, memo } from 'react'
import { useTranslations } from 'next-intl'

import { FieldError } from '@/common/types'

type FieldErrorsProps = {
  isValid: boolean
  errors?: Array<FieldError>
}

const FieldErrors: FunctionComponent<FieldErrorsProps> = ({ isValid, errors }) => {
  const t = useTranslations('validation')

  const errorsList = !isValid && errors?.map((item, index) => {
    if (Array.isArray(item)) {
      return <div key={index}>{t(item[0], { value: item[1] })}</div>
    }
    return <div key={index}>{t(item)}</div>
  })

  return <div className='text-red text-sm'>{errorsList}</div>
}

export default memo(FieldErrors)
