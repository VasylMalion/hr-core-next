'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { formatDate, useRouter } from '@/common/utils'
import { useGetEmployee, useDeleteEmployee } from '@/api'
import { useUser } from '@/hooks'
import { ContentSection, RoleTypes, RoutePaths } from '@/common/types'
import { Button, WithPreload, Typography, Modal } from '@/ui-components'

const EmployeeDetails = () => {
  const t = useTranslations('employee-details')
  const { slug: id } = useParams<{ slug: string }>()
  const router = useRouter()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { user } = useUser()

  const { data, isFetching, isSuccess, isError } = useGetEmployee({ id })
  const { mutate: deleteMutate, reset, ...deletingData } = useDeleteEmployee()

  const onClose = (success?: boolean) => {
    setIsOpenModal(false)
    reset()
    if (success) router.push(RoutePaths.EMPLOYEES)
  }

  const personalInfo = [
    {
      title: t('name'),
      value: data?.name || '-',
    },
    {
      title: t('surname'),
      value: data?.surname || '-',
    },
    {
      title: t('genderTitle'),
      value: t(`gender.${data?.gender}`) || '-',
    },
    {
      title: t('birthDate'),
      value: formatDate(data?.birthDate!) || '-',
    },
  ]

  const contactInfo = [
    {
      title: t('email'),
      value: data?.email || '-',
    },
    {
      title: t('mobile'),
      value: data?.mobileNumber || '-',
    },
    {
      title: t('address'),
      value: data?.address || '-',
    },
  ]

  const workInfo = [
    {
      title: t('department'),
      value: data?.department || '-',
    },
    {
      title: t('position'),
      value: data?.position || '-',
    },
    {
      title: t('startDate'),
      value: formatDate(data?.startDate!) || '-',
    },
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance="subtitle">{t(title)}</Typography>
      <div className="grid gap-2 dark:bg-dark-100 bg-white p-4 rounded">
        {info.map((item, index) => (
          <div className="flex gap-2" key={index}>
            <span className="font-[ceraProLight]">{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <WithPreload
        isSuccess={isSuccess}
        isLoading={isFetching}
        isError={isError}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap:4">
          <Typography appearance="title">{t('title', { id })}</Typography>
          {user?.role === RoleTypes.ADMIN && (
            <div>
              <Button
                type="secondary"
                isLoading={false}
                onClick={() => setIsOpenModal(true)}
                className="border-red border !text-red"
              >
                {t('deleteEmployee')}
              </Button>
            </div>
          )}
        </div>
        <div className="max-w-medium flex flex-col gap-6">
          {getContent('personalInfo', personalInfo)}
          {getContent('contactInfo', contactInfo)}
          {getContent('workInfo', workInfo)}
        </div>
      </WithPreload>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={t('deletingTitle')}
        body={t('deletingDescription')}
        buttons={
          <>
            <Button
              isLoading={deletingData.isPending}
              textAlign="center"
              onClick={() => deleteMutate({ id })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign="center"
              type="secondary"
              onClick={() => setIsOpenModal(false)}
            >
              {t('no')}
            </Button>
          </>
        }
      />
      <Modal
        isOpen={deletingData.isSuccess}
        onClose={() => onClose(true)}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={deletingData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default EmployeeDetails
