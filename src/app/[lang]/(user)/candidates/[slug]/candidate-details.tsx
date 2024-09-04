'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { formatDate, useRouter } from '@/common/utils'
import { ContentSection, RoutePaths } from '@/common/types'
import { Button, WithPreload, Typography, Modal } from '@/ui-components'
import { useGetCandidate, useDeleteCandidate } from '@/api'

const CandidateDetails = () => {
  const t = useTranslations('candidate-details')
  const { slug: id } = useParams<{ slug: string }>()
  const router = useRouter()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { data, isSuccess, isFetching, isError } = useGetCandidate({ id })
  const {
    mutate: deleteMutate,
    reset,
    ...deletingStatus
  } = useDeleteCandidate()

  useEffect(() => {
    if (isSuccess && !data) {
      router.push(RoutePaths.CANDIDATES)
    }
  }, [isSuccess, data, router])

  const onClose = (success?: boolean) => {
    setIsOpenModal(false)
    reset()
    if (success) router.push(RoutePaths.CANDIDATES)
  }

  const personalInfo = [
    {
      title: t('name'),
      value: data?.name,
    },
    {
      title: t('surname'),
      value: data?.surname,
    },
    {
      title: t('genderTitle'),
      value: t(`gender.${data?.gender}`),
    },
    {
      title: t('birthDate'),
      value: formatDate(data?.birthDate!),
    },
  ]

  const contactInfo = [
    {
      title: t('email'),
      value: data?.email,
    },
    {
      title: t('mobile'),
      value: data?.mobileNumber,
    },
    {
      title: t('address'),
      value: data?.location,
    },
  ]

  const workInfo = [
    {
      title: t('position'),
      value: data?.position,
    },
    {
      title: t('salary'),
      value: data?.salary ? t('salaryValue', { value: data?.salary }) : '-',
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4">
          <Typography appearance="title">{t('title', { id })}</Typography>
          <div>
            <Button
              type="secondary"
              onClick={() => setIsOpenModal(true)}
              className="border-red border !text-red"
            >
              {t('deleteCandidate')}
            </Button>
          </div>
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
              isLoading={deletingStatus.isPending}
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
        isOpen={deletingStatus.isSuccess}
        onClose={() => onClose(true)}
        title={t('successTitle')}
        body={t('successDescription')}
      />
      <Modal
        isOpen={deletingStatus.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
    </>
  )
}

export default CandidateDetails
