import { useMutation } from '@tanstack/react-query'
import { LoginFailResponse, LoginParams, LoginResponse } from '../types'
import { authApi } from '../axios'
import { AxiosError } from 'axios'

const login = async (params: LoginParams) => {
  const response = await authApi.post<LoginResponse>('/login', params)
  return response.data
}

const useLogin = () =>
  useMutation<LoginResponse, AxiosError<LoginFailResponse>, LoginParams>({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => login(params),
  })

export { useLogin }
