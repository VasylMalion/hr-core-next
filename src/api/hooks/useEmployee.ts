import { useMutation, useQuery } from '@tanstack/react-query'
import { PER_PAGE } from '@/common/constants'
import { instanceApi } from '../axios'
import {
  AddEmployeeParams,
  DeleteEmployeeParams,
  DeleteEmployeeResponse,
  FindEmployeesParams,
  FindEmployeesResponse,
  GetEmployeeParams,
  GetEmployeeResponse,
  GetEmployeesParams,
  GetEmployeesResponse,
} from '../types'

const getEmployees = async (params: GetEmployeesParams) => {
  const response = await instanceApi.get<GetEmployeesResponse>('/employees', { params } )
  return response.data
}

const useGetEmployees = (params: GetEmployeesParams) =>
  useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      getEmployees({
        ...params,
        limit: PER_PAGE,
      }),
  })

const getEmployee = async ({ id }: GetEmployeeParams) => {
  const response = await instanceApi.get<GetEmployeeResponse>(
    `/employees/${id}`
  )
  return response.data
}

function useGetEmployee(params: GetEmployeeParams) {
  return useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployee(params),
  })
}

const addEmployee = async (params: AddEmployeeParams) => {
  const response = await instanceApi.post('/employees/add', params)
  return response.data
}

const useAddEmployee = () =>
  useMutation({
    mutationKey: ['employees'],
    mutationFn: (params: AddEmployeeParams) => addEmployee(params),
  })

const findEmployees = async (params: FindEmployeesParams) => {
  const response = await instanceApi.post<FindEmployeesResponse>(
    '/employees/search',
    { params }
  )
  return response.data
}

// const useFindEmployees = () =>
//   useMutation({
//     mutationKey: ['employees'],
//     mutationFn: (params: FindEmployeesParams) => findEmployees(params),
//   })

  const useFindEmployees = (params: FindEmployeesParams) =>
    useQuery({
      queryKey: ['employees'],
      queryFn: () =>
        findEmployees(params),
    })

const deleteEmployee = async ({ id }: DeleteEmployeeParams) => {
  const response = await instanceApi.delete<DeleteEmployeeResponse>(
    `/employees/${id}`
  )
  return response.data
}

const useDeleteEmployee = () =>
  useMutation({
    mutationKey: ['employees'],
    mutationFn: (params: DeleteEmployeeParams) => deleteEmployee(params),
  })

export {
  useGetEmployees,
  useGetEmployee,
  useAddEmployee,
  useFindEmployees,
  useDeleteEmployee,
}
