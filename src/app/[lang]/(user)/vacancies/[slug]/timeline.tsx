import { FunctionComponent } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ContentSection, Status, Theme, VacancyStatus } from '@/common/types'
import { formatDate } from '@/common/utils/common'
import { Typography, WithPreload } from '@/ui-components'
import AvatarIcon from '@/assets/images/avatar.png'
import AvatarWhiteIcon from '@/assets/images/avatar-white.png'
import { useTheme } from 'next-themes'

type TimelineProps = {
  createdAt: Date
  updatedAt: Date
  deadlineDate: Date
  status: VacancyStatus
  createdBy: {
    id: string
    name: string
    surname: string
  }
  assignedTo: {
    id: string
    name: string
    surname: string
  }
  vacancyStatus: Status
}

const Timeline: FunctionComponent<TimelineProps> = ({
  createdAt,
  updatedAt,
  deadlineDate,
  status,
  createdBy,
  assignedTo,
  vacancyStatus,
}) => {
  const t = useTranslations('vacancy-details')

  const { resolvedTheme } = useTheme()

  const isDarkTheme = resolvedTheme === Theme.DARK
  const timeline = [
    {
      title: t('createdAt'),
      value: formatDate(createdAt),
    },
    {
      title: t('deadlineDate'),
      value: deadlineDate ? formatDate(deadlineDate) : '-',
    },
    {
      title: t('closedAt'),
      value: status === VacancyStatus.INACTIVE ? formatDate(updatedAt) : '-',
    },
  ]

  const hiringTeam = [
    {
      title: t('createdBy'),
      value: `${createdBy?.name} ${createdBy?.surname}`,
    },
    {
      title: t('assignedTo'),
      value: `${assignedTo?.name} ${assignedTo?.surname}`,
    },
  ]

  const getContent = (
    title: string,
    info: ContentSection,
    withIcon?: boolean
  ) => (
    <div>
      <Typography appearance="subtitle">{t(title)}</Typography>
      <div className="grid gap-2 dark:bg-dark-100 bg-white p-4 rounded">
        {info.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="font-[ceraProLight]">{item.title}</span>
            {withIcon ? (
              <div className="flex items-center gap-1">
                <Image
                  src={isDarkTheme ? AvatarWhiteIcon : AvatarIcon}
                  className="w-8 h-8"
                  alt=""
                />
                <span>{item.value}</span>
              </div>
            ) : (
              <span>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <WithPreload
      isLoading={vacancyStatus.isLoading}
      isSuccess={vacancyStatus.isSuccess}
      isError={vacancyStatus.isError}
    >
      <div className="max-w-medium flex flex-col gap-6 my-8">
        {getContent('timeline', timeline)}
        {getContent('hiringTeam', hiringTeam, true)}
      </div>
    </WithPreload>
  )
}

export default Timeline
