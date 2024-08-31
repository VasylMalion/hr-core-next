'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import {
  FoundUser,
  InputState,
  RoutePaths,
  SelectInputState,
} from '@/common/types'
import { checkValidation } from '@/common/validation'
import { useAddVacancy, useFindEmployees } from '@/api'
import { useRouter } from '@/common/utils'
import { useDebounce } from '@/hooks'
import {
  Button,
  DatePicker,
  Typography,
  Input,
  Modal,
  TextArea,
  SelectInput,
} from '@/ui-components'

const CandidateAdding = () => {
  const t = useTranslations('vacancy-adding')
  const router = useRouter()

  const [department, setDepartment] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [position, setPosition] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [location, setLocation] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [description, setDescription] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [assignedTo, setAssignedTo] = useState<SelectInputState>({
    value: null,
    validation: { isValid: true },
  })
  const [deadlineDate, setDeadlineDate] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [salaryMin, setSalaryMin] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [salaryMax, setSalaryMax] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })

  const [inputValue, setInputValue] = useState<string>('')
  const debouncedInputValue = useDebounce({ value: inputValue })

  const { isPending, isSuccess, isError, mutate, reset } = useAddVacancy()
  const findEmployees = useFindEmployees({ username: debouncedInputValue })

  const handleSubmit = () =>
    mutate({
      department: department.value,
      position: position.value,
      location: location.value,
      description: description.value,
      assignedTo: assignedTo.value as FoundUser,
      deadlineDate: new Date(deadlineDate.value),
      salaryMin: salaryMin.value,
      salaryMax: salaryMax.value,
    })

  const onSuccessClose = () => {
    reset()
    router.push(RoutePaths.VACANCIES)
  }

  const shouldShowError =
    salaryMin.value &&
    salaryMin.validation.isValid &&
    salaryMax.value &&
    salaryMax.validation.isValid &&
    +salaryMin.value > +salaryMax.value

  const isValid =
    department.value &&
    department.validation.isValid &&
    position.value &&
    position.validation.isValid &&
    location.value &&
    location.validation.isValid &&
    description.value &&
    description.validation.isValid &&
    assignedTo.value &&
    assignedTo.validation.isValid &&
    deadlineDate.value &&
    deadlineDate.validation.isValid &&
    salaryMin.value &&
    salaryMin.validation.isValid &&
    salaryMax.value &&
    salaryMax.validation.isValid &&
    !shouldShowError

  const handleDepartment = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setDepartment({ value, validation })
  }

  const handlePosition = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setPosition({ value, validation })
  }

  const handleLocation = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setLocation({ value, validation })
  }

  const handleDescription = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 20,
    })

    setDescription({ value, validation })
  }

  const handleAssignedTo = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setAssignedTo((prev: any) => ({ ...prev, validation }))
  }

  const handleDeadlineDate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      date: true,
    })

    setDeadlineDate({ value, validation })
  }

  const handleSalaryMin = (value: string) => {
    if (value.length > 7) return

    const validation = checkValidation(value, {
      required: true,
      salary: true,
    })

    setSalaryMin({ value, validation })
  }

  const handleSalaryMax = (value: string) => {
    if (value.length > 7) return

    const validation = checkValidation(value, {
      required: true,
      salary: true,
    })

    setSalaryMax({ value, validation })
  }
  return (
    <>
      <Typography appearance="title">{t('title')}</Typography>
      <div className="grid gap-6 max-w-large">
        <div className='grid grid-cols-row gap-4 md:gap-8'>
          <Input
            label={t('department')}
            placeholder={t('department')}
            className="w-full"
            value={department.value}
            onChange={handleDepartment}
            validation={department.validation}
          />
          <Input
            label={t('position')}
            placeholder={t('position')}
            className="w-full"
            value={position.value}
            onChange={handlePosition}
            validation={position.validation}
          />
        </div>
        <div className='grid grid-cols-row gap-4 md:gap-8'>
          <Input
            label={t('location')}
            placeholder={t('location')}
            className="w-full"
            value={location.value}
            onChange={handleLocation}
            validation={location.validation}
          />
        </div>
        <div className='grid grid-cols-row gap-4 md:gap-8'>
          <DatePicker
            label={t('deadlineDate')}
            placeholder={t('deadlineDate')}
            className="w-full"
            value={deadlineDate.value}
            validation={deadlineDate.validation}
            setValue={handleDeadlineDate}
          />
          {/* <SelectInput
            label={t('assignedTo')}
            placeholder={t('assignedTo')}
            value={inputValue}
            setValue={(value) => {
              setInputValue(value)
              handleAssignedTo(value)
            }}
            isLoading={findEmployees.isPending}
            data={findEmployees.data}
            validation={assignedTo.validation}
            onSuccessFind={(value) => setAssignedTo({ ...assignedTo, value })}
          /> */}
        </div>
        <div className='grid grid-cols-row gap-4 md:gap-8'>
          <Input
            type="number"
            label={t('salaryMin')}
            placeholder={t('salaryMin')}
            className="w-full"
            value={salaryMin.value}
            onChange={handleSalaryMin}
            validation={salaryMin.validation}
          />
          <Input
            type="number"
            label={t('salaryMax')}
            placeholder={t('salaryMax')}
            className="w-full"
            value={salaryMax.value}
            onChange={handleSalaryMax}
            validation={salaryMax.validation}
          />
        </div>
        {shouldShowError && <div className="text-red">{t('salaryError')}</div>}
        <div className='grid grid-cols-row gap-4 md:gap-8'>
          <TextArea
            label={t('description')}
            placeholder={t('description')}
            className="w-full"
            value={description.value}
            onChange={handleDescription}
            validation={description.validation}
          />
        </div>
        <Button
          textAlign="center"
          className="flex justify-self-start mt-4"
          onClick={handleSubmit}
          isLoading={isPending}
          disabled={!isValid}
        >
          {t('create')}
        </Button>
      </div>
      <Modal
        isOpen={isSuccess}
        onClose={onSuccessClose}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={isError}
        onClose={reset}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default CandidateAdding
