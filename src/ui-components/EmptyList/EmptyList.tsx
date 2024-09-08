'use client'
import { FunctionComponent, ReactNode, memo } from 'react'
import { useTranslations } from 'next-intl'

import NoResultIcon from '@/assets/svgs/NoResultIcon'

type EmptyListProps = {
  className?: ReactNode
}

const EmptyList: FunctionComponent<EmptyListProps> = ({ className }) => {
  const t = useTranslations('ui-components')

  return (
    <div
      className={`${className} flex flex-col justify-center items-center my-10 mx-4 dark:text-white`}
      data-testid="empty-list"
    >
      <NoResultIcon className="w-40 h-40 md:w-52 md:h-52 stroke-black dark:stroke-white" />
      <div className="text-center mb-8">
        <div className="text-3xl mb-2">{t('failTitle')}</div>
        <div>{t('noResult')}</div>
      </div>
    </div>
  )
}

export default memo(EmptyList)
