'use client'
import React, { useEffect } from 'react'
import Error from 'next/error'
import { RoutePaths } from '@/common/types'
import { useRouter } from '@/common/utils'

export default function NotFound() {

  const router = useRouter()

  useEffect(() => {
    router.push(RoutePaths.DASHBOARD)
  }, [router])

  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}