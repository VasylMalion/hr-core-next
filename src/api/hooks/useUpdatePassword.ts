import { useMutation } from '@tanstack/react-query'
import { UpdatePasswordParams } from '../types'
import { instanceApi } from '../axios'

const updatePassword = async (params: UpdatePasswordParams) => {
  const response = await instanceApi.post('/password', params)
  return response.data
}

const useUpdatePassword = () =>
  useMutation({
    mutationKey: ['employees'],
    mutationFn: (params: UpdatePasswordParams) => updatePassword(params),
  })

export { useUpdatePassword }
