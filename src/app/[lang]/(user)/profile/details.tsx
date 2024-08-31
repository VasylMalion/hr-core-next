import { useTranslations } from 'next-intl'

import { ContentSection } from '@/common/types'
import { Typography } from '@/ui-components'
import { formatDate } from '@/common/utils'
import { useUser } from '@/hooks'

const Details = () => {
  const t = useTranslations('profile')

  const { user } = useUser()

  const personalInfo = [
    {
      title: t('name'),
      value: user?.name,
    },
    {
      title: t('surname'),
      value: user?.surname,
    },
    {
      title: t('genderTitle'),
      value: t(`gender.${user?.gender}`),
    },
    {
      title: t('birthDate'),
      value: formatDate(user?.birthDate!),
    },
  ]

  const contactInfo = [
    {
      title: t('email'),
      value: user?.email,
    },
    {
      title: t('mobile'),
      value: user?.mobileNumber,
    },
    {
      title: t('address'),
      value: user?.address,
    },
  ]

  const workInfo = [
    {
      title: t('department'),
      value: user?.department,
    },
    {
      title: t('position'),
      value: user?.position,
    },
    {
      title: t('startDate'),
      value: formatDate(user?.startDate!),
    },
  ]

  const getContent = (title: string, info: ContentSection) => (
    <div>
      <Typography appearance="subtitle">{t(title)}</Typography>
      <div className="grid gap-2 bg-white dark:bg-dark-100 p-4 rounded">
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
    <div className="max-w-medium flex flex-col gap-6">
      {getContent('personalInfo', personalInfo)}
      {getContent('contactInfo', contactInfo)}
      {getContent('workInfo', workInfo)}
    </div>
  )
}

export default Details
