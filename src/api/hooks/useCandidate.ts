import { useMutation, useQuery } from '@tanstack/react-query'
import { PER_PAGE } from '@/common/constants'
import { instanceApi } from '../axios'
import {
  AddCandidateParams,
  DeleteCandidateParams,
  DeleteCandidateResponse,
  FindCandidatesParams,
  FindCandidatesResponse,
  GetCandidateParams,
  GetCandidateResponse,
  GetCandidatesParams,
  GetCandidatesResponse,
} from '../types'

const getCandidates = async (params: GetCandidatesParams) => {
  const response = await instanceApi.get<GetCandidatesResponse>('/candidates', {
    params,
  })
  return response.data
}

const useGetCandidates = (params: GetCandidatesParams) =>
  useQuery({
    queryKey: ['candidates'],
    queryFn: () =>
      getCandidates({
        ...params,
        limit: PER_PAGE,
      }),
  })

const getCandidate = async ({ id }: GetCandidateParams) => {
  const response = await instanceApi.get<GetCandidateResponse>(
    `/candidates/${id}`
  )
  return response.data
}

function useGetCandidate(params: GetCandidateParams) {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: () => getCandidate(params),
  })
}

const addCandidate = async (params: AddCandidateParams) => {
  const response = await instanceApi.post('/candidates/add', params)
  return response.data
}

const useAddCandidate = () =>
  useMutation({
    mutationKey: ['candidates'],
    mutationFn: (params: AddCandidateParams) => addCandidate(params),
  })

const findCandidates = async (params: FindCandidatesParams) => {
  const response = await instanceApi.get<FindCandidatesResponse>(
    '/candidates/search',
    { params }
  )
  return response.data
}

const useFindCandidates = () =>
  useMutation({
    mutationKey: ['candidates'],
    mutationFn: (params: FindCandidatesParams) => findCandidates(params),
  })

const deleteCandidate = async ({ id }: DeleteCandidateParams) => {
  const response = await instanceApi.delete<DeleteCandidateResponse>(
    `/candidates/${id}`
  )
  return response.data
}

const useDeleteCandidate = () =>
  useMutation({
    mutationKey: ['candidates'],
    mutationFn: (params: DeleteCandidateParams) => deleteCandidate(params),
  })

export {
  useGetCandidates,
  useGetCandidate,
  useAddCandidate,
  useFindCandidates,
  useDeleteCandidate,
}
