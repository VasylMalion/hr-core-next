import { UserInfo } from '../types'
import { getServerCookie } from './serverCookies'

export const getUserInfo: () => Promise<UserInfo> = async () => {
  try {
    const user = await getServerCookie('user')

    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}
