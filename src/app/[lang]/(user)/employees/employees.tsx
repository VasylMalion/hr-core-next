'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { formatDate } from '@/common/utils'
import PlusIcon from '@/assets/svgs/PlusIcon'
import { useGetEmployees } from '@/api'
import { useDebounce } from '@/hooks'
import { generateRouteAsPath, useRouter } from '@/common/utils'
import { RoleTypes, RoutePaths } from '@/common/types'
import { useUser } from '@/hooks'
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
  EmptyList,
} from '@/ui-components'

const Employees = () => {
  const t = useTranslations('employees-list')
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('')
  const debouncedInputValue = useDebounce({ value: filter })

  const { user } = useUser()

  const { data, isSuccess, isError, refetch, isFetching } = useGetEmployees({
    page: currentPage,
    filter: debouncedInputValue,
  })

  useEffect(() => {
    refetch()
  }, [currentPage, debouncedInputValue, refetch])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const routeChange = (id: string) => {
    const path = generateRouteAsPath(RoutePaths.EMPLOYEE_DETAILS, { id })
    router.push(path)
  }

  const handleAdding = () => router.push(RoutePaths.EMPLOYEE_ADDING)

  const rows =
    data &&
    data.users?.map((item) => (
      <TableRow key={item.id} onClick={() => routeChange(item.id!)}>
        <TableCell>{`${item.name} ${item.surname}`}</TableCell>
        <TableCell>{item.address}</TableCell>
        <TableCell>{item.position}</TableCell>
        <TableCell>{formatDate(item.birthDate!)}</TableCell>
        <TableCell>{item.mobileNumber}</TableCell>
      </TableRow>
    ))

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4">
        <Typography appearance="title">{t('title')}</Typography>
        {user?.role === RoleTypes.ADMIN && (
          <div>
            <Button icon={<PlusIcon />} onClick={handleAdding}>
              {t('addEmployee')}
            </Button>
          </div>
        )}
      </div>
      <Input
        label={t('search')}
        placeholder={t('search')}
        value={filter}
        onChange={setFilter}
        className="mb-8 md:mb-6"
      />
      <WithPreload
        isLoading={isFetching}
        isSuccess={isSuccess}
        isError={isError}
      >
        {data?.users?.length ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>{t('employee')}</TableHeadCell>
                  <TableHeadCell>{t('location')}</TableHeadCell>
                  <TableHeadCell>{t('position')}</TableHeadCell>
                  <TableHeadCell>{t('birthDate')}</TableHeadCell>
                  <TableHeadCell>{t('mobileNumber')}</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
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
    </>
  )
}

export default Employees
