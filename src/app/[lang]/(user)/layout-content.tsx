'use client'
import { useState } from 'react'

import { cn } from '@/common/utils'
import { UserInfo } from '@/common/types'
import { Navbar } from '@/ui-components'

import Header from './header'

type TLayoutProps = {
  user: UserInfo
  children: React.ReactNode
}

export function LayoutContent({ user, children }: TLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <div className="hidden md:flex md:fixed">
        <Navbar user={user} />
      </div>
      <div
        className={cn(
          'flex md:hidden z-10 fixed top-20 transition-all	duration-150 ease-in',
          isSidebarOpen ? 'left-0' : 'left-[-20rem]'
        )}
      >
        <Navbar setIsSidebarOpen={setIsSidebarOpen} user={user} />
      </div>
      <div className="dark:text-white flex-auto md:ms-[16.25rem]">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-8 md:p-12 dark:bg-dark-300 bg-purpleLight mt-20 min-h-content pb-16 w-screen md:w-content">
          {children}
        </div>
      </div>
    </>
  )
}
