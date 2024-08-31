'use client'
import React, { createContext, useState, useEffect } from 'react'

import { UserInfo } from '@/common/types'

type UserContextType = {
  user: UserInfo
  session: string | null
}

type UserProviderType = {
  userCookies: UserInfo
  tokenCookies: string
  children: React.ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({
  children,
  userCookies,
  tokenCookies,
}: UserProviderType) => {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<string | null>(null)

  useEffect(() => {
    setSession(tokenCookies)
    setUser(userCookies)
  }, [])

  return (
    <UserContext.Provider value={{ user, session }}>
      {children}
    </UserContext.Provider>
  )
}
