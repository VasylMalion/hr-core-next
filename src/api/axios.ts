import axios from 'axios'

import { getServerCookie } from '@/common/utils'

export const instanceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

instanceApi.interceptors.request.use(async (config) => {
  const token = await getServerCookie('session')
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})