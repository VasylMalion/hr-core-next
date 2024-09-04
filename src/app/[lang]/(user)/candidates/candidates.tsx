'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { formatDate, useRouter, generateRouteAsPath } from '@/common/utils'
import PlusIcon from '@/assets/svgs/PlusIcon'
import { RoutePaths } from '@/common/types'
import { useGetCandidates } from '@/api'
import { useDebounce } from '@/hooks'
import {
  Button,
  WithPreload,
  Typography,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableHeadCell,
  Pagination,
  Input,
  Checkbox,
  EmptyList,
} from '@/ui-components'

const CandidatesList = () => {
  const t = useTranslations('candidates-list')
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onlyMine, setOnlyMine] = useState<boolean>(false)
  const [filter, setFilter] = useState('')
  const debouncedInputValue = useDebounce({ value: filter })

  const { data, isSuccess, isError, isFetching, refetch } = useGetCandidates({
    page: currentPage,
    filter: debouncedInputValue,
    onlyMine: onlyMine ? 1 : 0,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, onlyMine])

  useEffect(() => {
    refetch()
  }, [currentPage, onlyMine, debouncedInputValue, refetch])

  const routeChange = (id: string) => {
    const path = generateRouteAsPath(RoutePaths.CANDIDATE_DETAILS, { id })
    router.push(path)
  }

  const handleAdding = () => router.push(RoutePaths.CANDIDATE_ADDING)

  const rows = data?.candidates?.map((item) => (
    <TableRow key={item.id} onClick={() => routeChange(item.id)}>
      <TableCell>{`${item.name} ${item.surname}`}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>{item.position}</TableCell>
      <TableCell>{formatDate(item.birthDate)}</TableCell>
      <TableCell>{item.mobileNumber}</TableCell>
    </TableRow>
  ))

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4">
        <Typography appearance="title">{t('title')}</Typography>
        <div>
          <Button icon={<PlusIcon />} onClick={handleAdding}>
            {t('addCandidate')}
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-6">
        <Input
          label={t('search')}
          placeholder={t('search')}
          className="mb-4 md:mb-0"
          value={filter}
          onChange={setFilter}
        />
        <Checkbox
          checked={onlyMine}
          onChange={setOnlyMine}
          caption={t('onlyMine')}
        />
      </div>
      <WithPreload
        isLoading={isFetching}
        isSuccess={isSuccess}
        isError={isError}
      >
        {data?.candidates?.length ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>{t('candidate')}</TableHeadCell>
                  <TableHeadCell>{t('location')}</TableHeadCell>
                  <TableHeadCell>{t('position')}</TableHeadCell>
                  <TableHeadCell>{t('birthDate')}</TableHeadCell>
                  <TableHeadCell>{t('mobileNumber')}</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
            <div className="m-8">
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
    </>
  )
}

export default CandidatesList
