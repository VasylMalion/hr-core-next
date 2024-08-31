'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Typography } from '@/ui-components'
import ContentIcon from '@/assets/images/dashboard-content.png'

function Dashboard() {
  const t = useTranslations('dashboard')

  return (
    <div data-testid="dashboard-page" className="mt-8">
      <Typography appearance="title" className="text-center">
        {t('title')}
      </Typography>
      <Image
        src={ContentIcon}
        alt={t('imageAlt')}
        className="mx-auto"
        draggable={false}
      />
    </div>
  )
}

export default Dashboard
