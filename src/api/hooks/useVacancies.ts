import { useMutation, useQuery } from '@tanstack/react-query'
import { VACANCIES_PER_PAGE } from '@/common/constants'
import { instanceApi } from '../axios'
import {
  GetVacanciesParams,
  GetVacanciesResponse,
  GetVacancyParams,
  GetVacancyResponse,
  DeactivateVacancyParams,
  AddVacancyParams,
  AddTaskParams,
  AddTaskResponse,
  UpdateTaskParams,
  DeleteTaskParams,
} from '../types'

const getVacancies = async (params: GetVacanciesParams) => {
  const response = await instanceApi.get<GetVacanciesResponse>('/jobs', {
    params,
  })
  return response.data
}

const useGetVacancies = (params: GetVacanciesParams) =>
  useQuery({
    queryKey: ['vacancy'],
    queryFn: () =>
      getVacancies({
        ...params,
        limit: VACANCIES_PER_PAGE,
        onlyMine: params.onlyMine ? 1 : 0,
      }),
  })

const getVacancy = async ({ id }: GetVacancyParams) => {
  const response = await instanceApi.get<GetVacancyResponse>(`/jobs/${id}`)
  return response.data
}

function useGetVacancy(params: GetVacancyParams) {
  return useQuery({
    queryKey: ['vacancy'],
    queryFn: () => getVacancy(params),
  })
}

const addVacancy = async (params: AddVacancyParams) => {
  const response = await instanceApi.post('/jobs/add', {
    params,
  })
  return response.data
}

const useAddVacancy = () =>
  useMutation({
    mutationKey: ['vacancy'],
    mutationFn: (params: AddVacancyParams) => addVacancy(params),
  })

const deactivateVacancy = async ({ id }: DeactivateVacancyParams) => {
  const response = await instanceApi.post(`/jobs/${id}/deactivate`)
  return response.data
}

const useDeactivateVacancy = () =>
  useMutation({
    mutationKey: ['vacancy'],
    mutationFn: (params: DeactivateVacancyParams) => deactivateVacancy(params),
  })

const addTask = async ({ id }: AddTaskParams) => {
  const response = await instanceApi.post<AddTaskResponse>(`/jobs/${id}/task`)
  return response.data
}

const useAddTask = () =>
  useMutation({
    mutationKey: ['vacancy'],
    mutationFn: (params: AddTaskParams) => addTask(params),
  })

const deleteTask = async ({ vacancyId }: DeleteTaskParams) => {
  const response = await instanceApi.post(`/jobs/${vacancyId}/task`)
  return response.data
}

const useDeleteTask = () =>
  useMutation({
    mutationKey: ['vacancy'],
    mutationFn: (params: DeleteTaskParams) => deleteTask(params),
  })

const updateTask = async ({ id }: UpdateTaskParams) => {
  const response = await instanceApi.post(`/jobs/${id}/updateTask`)
  return response.data
}

const useUpdateTask = () =>
  useMutation({
    mutationKey: ['vacancy'],
    mutationFn: (params: UpdateTaskParams) => updateTask(params),
  })

export {
  useGetVacancies,
  useGetVacancy,
  useAddVacancy,
  useDeactivateVacancy,
  useDeleteTask,
  useAddTask,
  useUpdateTask,
}
