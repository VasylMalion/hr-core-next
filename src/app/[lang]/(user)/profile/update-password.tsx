'use client'
import { useState } from 'react'

import { InputState } from '@/common/types'
import { Button, Input, Modal } from '@/ui-components'
import { checkValidation } from '@/common/validation'
import { useTranslations } from 'next-intl'
import { useUpdatePassword } from '@/api'

const inputState = { value: '', validation: { isValid: true } }

const UpdatePassword = () => {
  const t = useTranslations('profile')

  const [passwordOld, setPasswordOld] = useState<InputState>(inputState)
  const [passwordNew, setPasswordNew] = useState<InputState>(inputState)
  const [passwordNewAgain, setPasswordNewAgain] =
    useState<InputState>(inputState)

  const { isPending, mutate, isSuccess, reset, isError, error } =
    useUpdatePassword()

  const shouldShowError =
    passwordNew.value &&
    passwordNew.validation.isValid &&
    passwordNewAgain.value &&
    passwordNewAgain.validation.isValid &&
    passwordNew.value !== passwordNewAgain.value

  const isValid =
    passwordOld.value &&
    passwordOld.validation.isValid &&
    passwordNew.value &&
    passwordNew.validation.isValid &&
    passwordNewAgain.value &&
    passwordNewAgain.validation.isValid &&
    passwordNew.value === passwordNewAgain.value

  const handleSubmit = () =>
    mutate({
      passwordOld: passwordOld.value,
      passwordNew: passwordNew.value,
    })

  const handlePasswordOld = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 8,
    })

    setPasswordOld({ value, validation })
  }

  const handlePasswordNew = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      password: true,
    })

    setPasswordNew({ value, validation })
  }

  const handlePasswordNewAgain = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      password: true,
    })

    setPasswordNewAgain({ value, validation })
  }

  const onClose = () => {
    reset()
    setPasswordOld(inputState)
    setPasswordNew(inputState)
    setPasswordNewAgain(inputState)
  }

  return (
    <>
      <div className="grid gap-8 max-w-[25rem]">
        <div>
          <Input
            type="password"
            placeholder={t('passwordOld')}
            label={t('passwordOld')}
            className="w-full"
            value={passwordOld.value}
            onChange={handlePasswordOld}
            validation={passwordOld.validation}
          />
        </div>
        <div className="grid gap-4">
          <div>
            <Input
              type="password"
              placeholder={t('passwordNew')}
              label={t('passwordNew')}
              className="w-full"
              value={passwordNew.value}
              onChange={handlePasswordNew}
              validation={passwordNew.validation}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder={t('passwordNewAgain')}
              label={t('passwordNewAgain')}
              className="w-full"
              value={passwordNewAgain.value}
              onChange={handlePasswordNewAgain}
              validation={passwordNewAgain.validation}
            />
          </div>
        </div>
      </div>
      {shouldShowError && (
        <div className="text-red mt-4">{t('differentPasswords')}</div>
      )}
      <Button
        textAlign="center"
        disabled={!isValid}
        isLoading={isPending}
        onClick={handleSubmit}
        className="mt-8"
      >
        {t('update')}
      </Button>
      <Modal
        isOpen={isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t(`errors.${error?.response?.data}`)}
      />
    </>
  )
}

export default UpdatePassword
