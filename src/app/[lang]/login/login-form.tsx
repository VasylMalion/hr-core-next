'use client'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Typography, Input, Button } from '@/ui-components'
import { InputState, RoutePaths } from '@/common/types'
import { checkValidation } from '@/common/validation'
import { setServerCookie, useRouter } from '@/common/utils'
import { useLogin } from '@/api'

const inputState = { value: '', validation: { isValid: true } }

const Login: FunctionComponent = () => {
  const t = useTranslations('login')
  const router = useRouter()

  const [email, setEmail] = useState<InputState>(inputState)
  const [password, setPassword] = useState<InputState>(inputState)
  const [shouldHideError, setShouldHideError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, mutate, isSuccess, isError, error, reset } = useLogin()

  useEffect(() => {
    const handleSubmit = async () => {
      setIsLoading(true)

      await setServerCookie('session', data?.token || '', {
        path: '/',
        maxAge: 60 * 60, // 1 hour
      })
      await setServerCookie('user', JSON.stringify(data?.userInfo))

      setIsLoading(false)
      router.push(RoutePaths.DASHBOARD)
    }

    if (isSuccess) handleSubmit()
  }, [data, isSuccess, router])

  useEffect(() => {
    if (isError && shouldHideError) {
      reset()
      setShouldHideError(false)
    }
  }, [isError, shouldHideError, email, password, reset])

  useEffect(() => {
    if (isError) {
      setEmail(inputState)
      setPassword(inputState)
    }
  }, [isError])

  const isValid =
    email.value &&
    email.validation.isValid &&
    password.value &&
    password.validation.isValid

  const handleEmail = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      email: true,
    })

    setEmail({ value, validation })
    if (isError) setShouldHideError(true)
  }

  const handlePassword = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
      minLength: 8,
    })

    setPassword({ value, validation })
    if (isError) setShouldHideError(true)
  }

  return (
    <div
      data-testid="login-page"
      className="bg-purpleLight dark:bg-dark-300 h-screen w-screen flex items-center justify-center"
    >
      <div
        className="
          flex flex-col gap-8 justify-center bg-white py-8 px-8
          rounded-lg md:px-24 md:py-12 m-8 w-[28rem] md:w-[36rem] dark:bg-dark-200
        "
      >
        <Typography appearance="title" className="mb-[-0.5rem]">
          {t('title')}
        </Typography>
        <div className="grid gap-4 min-w-[16rem] md:min-w-[22rem]">
          <Input
            label={t('email')}
            placeholder={t('email')}
            className="w-full"
            value={email.value}
            onChange={handleEmail}
            validation={email.validation}
          />
          <Input
            type="password"
            placeholder={t('password')}
            label={t('password')}
            className="w-full"
            value={password.value}
            onChange={handlePassword}
            validation={password.validation}
          />
          {isError && !isLoading && (
            <div className="text-red">
              {t(`errors.${error?.response?.data}`)}
            </div>
          )}
        </div>
        <Button
          testId="login-btn"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          textAlign="center"
          className="w-full"
          onClick={() =>
            mutate({ email: email.value, password: password.value })
          }
        >
          {t('login')}
        </Button>
      </div>
    </div>
  )
}

export default Login
