'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { GenderTypes, InputState, RoutePaths } from '@/common/types'
import { checkValidation } from '@/common/validation'
import { useAddCandidate } from '@/api'
import { useRouter } from '@/common/utils'
import {
  Button,
  DatePicker,
  Typography,
  Select,
  Input,
  Modal,
} from '@/ui-components'

const CandidateAdding = () => {
  const t = useTranslations('candidate-adding')
  const router = useRouter()

  const [name, setName] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [surname, setSurname] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [gender, setGender] = useState<InputState>({
    value: GenderTypes.MALE,
    validation: { isValid: true },
  })
  const [birthDate, setBirthDate] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [email, setEmail] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [mobileNumber, setMobileNumber] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [location, setLocation] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [position, setPosition] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })
  const [salary, setSalary] = useState<InputState>({
    value: '',
    validation: { isValid: true },
  })

  const { isPending, isSuccess, isError, mutate, reset } = useAddCandidate()

  const handleSubmit = () =>
    mutate({
      name: name.value,
      surname: surname.value,
      gender: gender.value,
      birthDate: new Date(birthDate.value),
      email: email.value,
      mobileNumber: mobileNumber.value,
      location: location.value,
      position: position.value,
      salary: +salary.value,
    })

  const onSuccessClose = () => {
    reset()
    router.push(RoutePaths.CANDIDATES)
  }

  const genderOptions = [
    { title: t('gender.male'), value: GenderTypes.MALE },
    { title: t('gender.female'), value: GenderTypes.FEMALE },
  ]

  const isValid =
    name.value &&
    name.validation.isValid &&
    surname.value &&
    surname.validation.isValid &&
    birthDate.value &&
    birthDate.validation.isValid &&
    gender.value &&
    gender.validation.isValid &&
    email.value &&
    email.validation.isValid &&
    mobileNumber.value &&
    mobileNumber.validation.isValid &&
    location.value &&
    location.validation.isValid &&
    position.value &&
    position.validation.isValid &&
    salary.validation.isValid

  const handleName = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setName({ value, validation })
  }

  const handleSurname = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setSurname({ value, validation })
  }

  const handleGender = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setGender({ value, validation })
  }

  const handleBirthDate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      date: true,
      birthDate: true,
    })

    setBirthDate({ value, validation })
  }

  const handleEmail = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      email: true,
    })

    setEmail({ value, validation })
  }

  const handleLocation = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 50,
    })

    setLocation({ value, validation })
  }

  const handleMobileNumber = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      mobileNumber: true,
    })

    setMobileNumber({ value, validation })
  }

  const handlePosition = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      maxLength: 40,
    })

    setPosition({ value, validation })
  }

  const handleSalary = (value: string) => {
    if (value.length === 7) return

    const validation = checkValidation(value, {
      salary: true,
    })

    setSalary({ value, validation })
  }

  return (
    <>
      <Typography appearance="title">{t('title')}</Typography>
      <div className="grid gap-6 max-w-large">
        <div>
          <Typography appearance="subtitle">{t('personalInfo')}</Typography>
          <div className="grid gap-4">
            <div className="grid grid-cols-row gap-4 md:gap-8">
              <Input
                label={t('name')}
                placeholder={t('name')}
                className="w-full"
                value={name.value}
                onChange={handleName}
                validation={name.validation}
              />
              <Input
                label={t('surname')}
                placeholder={t('surname')}
                className="w-full"
                value={surname.value}
                onChange={handleSurname}
                validation={surname.validation}
              />
            </div>
            <div className="grid grid-cols-row gap-4 md:gap-8">
              <Select
                options={genderOptions}
                label={t('genderTitle')}
                className="w-full"
                value={gender.value}
                onChange={handleGender}
                validation={gender.validation}
              />
              <DatePicker
                label={t('birthDate')}
                placeholder={t('birthDate')}
                className="w-full"
                value={birthDate.value}
                validation={birthDate.validation}
                setValue={handleBirthDate}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance="subtitle" className="mt-4">
            {t('contactInfo')}
          </Typography>
          <div className="grid gap-4">
            <div className="grid grid-cols-row gap-4 md:gap-8">
              <Input
                label={t('email')}
                placeholder={t('email')}
                className="w-full"
                value={email.value}
                onChange={handleEmail}
                validation={email.validation}
              />
              <Input
                type="number"
                label={t('mobile')}
                placeholder={t('mobile')}
                className="w-full"
                value={mobileNumber.value}
                onChange={handleMobileNumber}
                validation={mobileNumber.validation}
              />
            </div>
            <div className="grid grid-cols-row gap-4 md:gap-8">
              <Input
                label={t('location')}
                placeholder={t('location')}
                className="w-full"
                value={location.value}
                onChange={handleLocation}
                validation={location.validation}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography appearance="subtitle" className="mt-4">
            {t('workInfo')}
          </Typography>
          <div className="grid grid-cols-row gap-4 md:gap-8">
            <Input
              label={t('position')}
              placeholder={t('position')}
              className="w-full"
              value={position.value}
              onChange={handlePosition}
              validation={position.validation}
            />
            <Input
              type="number"
              label={t('salary')}
              placeholder={t('salary')}
              className="w-full"
              value={salary.value}
              onChange={handleSalary}
              validation={salary.validation}
            />
          </div>
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
