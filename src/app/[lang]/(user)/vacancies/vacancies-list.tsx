'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import PlusIcon from '@/assets/svgs/PlusIcon'
import { RoutePaths, Vacancy, VacancyStatus } from '@/common/types'
import { useGetVacancies } from '@/api'
import { useDebounce } from '@/hooks'
import { useRouter } from '@/common/utils'
import {
  Button,
  WithPreload,
  Typography,
  Pagination,
  Input,
  Checkbox,
  TabNavigation,
  EmptyList,
} from '@/ui-components'
import VacancyItem from './vacancy-item'

enum TabNavigationTypes {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

const CandidatesList = () => {
  const t = useTranslations('vacancies-list')
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tab, setTab] = useState<TabNavigationTypes>(TabNavigationTypes.ALL)
  const [onlyMine, setOnlyMine] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const debouncedInputValue = useDebounce({ value: filter })

  const { data, isSuccess, isError, isFetching, refetch } = useGetVacancies({
    status:
      tab !== TabNavigationTypes.ALL
        ? (tab as unknown as VacancyStatus)
        : undefined,
    page: currentPage,
    filter: debouncedInputValue,
    onlyMine: onlyMine ? 1 : 0,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [tab, filter, onlyMine])

  useEffect(() => {
    refetch()
  }, [tab, currentPage, onlyMine, debouncedInputValue, refetch])

  const list = data?.vacancies?.map((item: Vacancy, index: number) => (
    <VacancyItem key={index} {...item} />
  ))

  const options = [
    {
      title: t('tabs.ALL'),
      value: TabNavigationTypes.ALL,
    },
    {
      title: t('tabs.ACTIVE'),
      value: TabNavigationTypes.ACTIVE,
    },
    {
      title: t('tabs.INACTIVE'),
      value: TabNavigationTypes.INACTIVE,
    },
  ]

  return (
    <div data-testid="vacancies-page">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4">
        <Typography appearance="title">{t('title')}</Typography>
        <div>
          <Button
            icon={<PlusIcon />}
            onClick={() => router.push(RoutePaths.VACANCY_ADDING)}
          >
            {t('addNewVacancy')}
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-6">
        <Input
          label={t('search')}
          placeholder={t('search')}
          value={filter}
          onChange={setFilter}
          className="mb-4 md:mb-0"
        />
        <Checkbox
          checked={onlyMine}
          onChange={setOnlyMine}
          caption={t('onlyMine')}
        />
      </div>
      <TabNavigation<TabNavigationTypes>
        options={options}
        value={tab}
        onChange={setTab}
      />
      <WithPreload
        isLoading={isFetching}
        isSuccess={isSuccess}
        isError={isError}
      >
        {data?.vacancies?.length ? (
          <>
            <div className="flex flex-wrap gap-8 mt-8">{list}</div>
            <div className="my-8">
              <Pagination
                pagesCount={data?.count}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <EmptyList />
        )}
      </WithPreload>
    </div>
  )
}

export default CandidatesList
