import { useMutation } from '@tanstack/react-query'
import { FailResponse, UpdatePasswordParams } from '../types'
import { instanceApi } from '../axios'
import { AxiosError } from 'axios'

const updatePassword = async (params: UpdatePasswordParams) => {
  const response = await instanceApi.post('/password', params)
  return response.data
}

const useUpdatePassword = () =>
  useMutation<{}, AxiosError<FailResponse>, UpdatePasswordParams>({
    mutationKey: ['employees'],
    mutationFn: (params: UpdatePasswordParams) => updatePassword(params),
  })

export { useUpdatePassword }
