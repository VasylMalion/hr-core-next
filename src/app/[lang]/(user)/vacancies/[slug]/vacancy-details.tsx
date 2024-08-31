'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { useRouter } from '@/common/utils'
import {
  FoundUser,
  RoutePaths,
  SelectInputState,
  Vacancy,
  VacancyStatus,
} from '@/common/types'
import {
  Button,
  Typography,
  Modal,
  TabNavigation,
  SelectInput,
} from '@/ui-components'
import {
  useFindCandidates,
  useGetVacancy,
  useAddTask,
  useDeactivateVacancy,
} from '@/api'
import { useDebounce } from '@/hooks'
import Candidates from './candidates'
import Details from './details'
import Timeline from './timeline'
import { checkValidation } from '@/common/validation'
import PlusIcon from '@/assets/svgs/PlusIcon'

enum TabNavigationTypes {
  CANDIDATES = 'CANDIDATES',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  TIMELINE = 'TIMELINE',
}

const VacancyDetails = () => {
  const t = useTranslations('vacancy-details')
  const { slug: id } = useParams<{ slug: string }>()
  const router = useRouter()

  const [inputValue, setInputValue] = useState<string>('')
  const [tab, setTab] = useState<TabNavigationTypes>(
    TabNavigationTypes.CANDIDATES
  )
  const [candidate, setCandidate] = useState<SelectInputState>({
    value: null,
    validation: { isValid: true },
  })
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false)
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] =
    useState<boolean>(false)

  const debouncedInputValue = useDebounce({ value: inputValue })

  const candidates = useFindCandidates()

  useEffect(() => {
    candidates.mutate({ username: debouncedInputValue })
  }, [debouncedInputValue])

  const { data, isFetching, isSuccess, isError, refetch } = useGetVacancy({
    id,
  })

  const { mutate: addTask, ...addTaskData } = useAddTask()
  const { mutate: deactivate, ...deactivationData } = useDeactivateVacancy()

  useEffect(() => {
    if (isSuccess && !data) {
      router.push(RoutePaths.VACANCIES)
    }
  }, [isSuccess, data, router])

  const vacancyStatus = {
    isLoading: isFetching,
    isSuccess,
    isError,
  }

  const onClose = () => {
    setIsOpenDeactivateModal(false)
    setIsOpenTaskModal(false)
    setCandidate({ value: null, validation: { isValid: true } })
    setInputValue('')
    // dispatch(util.resetApiState())
  }

  const options = [
    {
      title: t('tabs.candidates'),
      value: TabNavigationTypes.CANDIDATES,
    },
    {
      title: t('tabs.vacancyDetails'),
      value: TabNavigationTypes.VACANCY_DETAILS,
    },
    {
      title: t('tabs.timeline'),
      value: TabNavigationTypes.TIMELINE,
    },
  ]

  const getContent = () => {
    switch (tab) {
      case TabNavigationTypes.CANDIDATES: {
        return (
          <Candidates
            {...(data as Vacancy)}
            refetch={refetch}
            vacancyStatus={vacancyStatus}
          />
        )
      }
      case TabNavigationTypes.VACANCY_DETAILS: {
        return <Details {...(data as Vacancy)} vacancyStatus={vacancyStatus} />
      }
      case TabNavigationTypes.TIMELINE: {
        return <Timeline {...(data as Vacancy)} vacancyStatus={vacancyStatus} />
      }
      default: {
        return (
          <Candidates
          {...(data as Vacancy)}
            refetch={refetch}
            vacancyStatus={vacancyStatus}
          />
        )
      }
    }
  }

  const handleCandidate = (value: string) => {
    const validation = checkValidation(value, {
      required: true,
    })

    setCandidate((prev) => ({ ...prev, validation }))
  }

  function navigate(CANDIDATE_ADDING: string): void {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Typography appearance="title">{t('title', { id })}</Typography>
        {data?.status === VacancyStatus.ACTIVE && (
          <div>
            <Button
              type="secondary"
              onClick={() => setIsOpenDeactivateModal(true)}
              className="border-red border !text-red"
            >
              {t('deactivate')}
            </Button>
          </div>
        )}
      </div>
      {data?.position && (
        <div className="flex flex-col my-6 md:mb-4 md:mt-0">
          <Typography appearance="subtitle">{data?.position}</Typography>
          <div>
            <Button
              icon={<PlusIcon />}
              onClick={() => setIsOpenTaskModal(true)}
            >
              {t('addTask')}
            </Button>
          </div>
        </div>
      )}
      <TabNavigation<TabNavigationTypes>
        options={options}
        value={tab}
        onChange={setTab}
      />
      {getContent()}
      <Modal
        isOpen={
          isOpenDeactivateModal &&
          !deactivationData.isSuccess &&
          !deactivationData.isError
        }
        onClose={() => setIsOpenDeactivateModal(false)}
        title={t('attention')}
        body={t('deactivationDescription')}
        buttons={
          <>
            <Button
              isLoading={deactivationData.isPending}
              textAlign="center"
              onClick={() => deactivate({ id })}
            >
              {t('yes')}
            </Button>
            <Button
              textAlign="center"
              type="secondary"
              onClick={() => setIsOpenDeactivateModal(false)}
            >
              {t('no')}
            </Button>
          </>
        }
      />
      <Modal
        isOpen={deactivationData.isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('deaSuccessDescription')}
      />
      <Modal
        isOpen={deactivationData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
      <Modal
        isOpen={addTaskData.isSuccess}
        onClose={onClose}
        title={t('successTitle')}
        body={t('taskSuccessDescription')}
      />
      <Modal
        isOpen={addTaskData.isError}
        onClose={onClose}
        title={t('failTitle')}
        body={t('failDescription')}
      />
      <Modal
        isOpen={
          isOpenTaskModal && !addTaskData.isSuccess && !addTaskData.isError
        }
        onClose={() => setIsOpenTaskModal(false)}
        title={t('addtaskTitle')}
        body={
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div>{t('addtaskDescription')}</div>
              {/* <SelectInput
                label={t('findCandidate')}
                placeholder={t('findCandidate')}
                value={inputValue}
                setValue={(value) => {
                  setInputValue(value)
                  handleCandidate(value)
                }}
                isLoading={candidates.isPending}
                data={candidates.data}
                validation={candidate.validation}
                onSuccessFind={(value) => setCandidate({ ...candidate, value })}
              /> */}
            </div>
            <div className="grid gap-3">
              <div>{t('cantFindCandidate')}</div>
              <Button
                onClick={() => navigate(RoutePaths.CANDIDATE_ADDING)}
                textAlign="center"
              >
                {t('addCandidate')}
              </Button>
            </div>
          </div>
        }
        buttons={
          <Button
            textAlign="center"
            disabled={!candidate.value}
            isLoading={addTaskData.isPending}
            onClick={() =>
              addTask({
                id,
                boardId: data?.desk?._id || '0',
                candidate: candidate.value as FoundUser,
              })
            }
          >
            {t('addTask')}
          </Button>
        }
      />
    </>
  )
}

export default VacancyDetails
