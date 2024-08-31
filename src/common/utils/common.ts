import { v4 as uniqueId } from 'uuid'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18n'

export const formatDate = (date: Date, separator: string = '-'): string => {
  const local = new Date(date)
  const day = local.getDate()
  const month = local.getMonth() + 1
  const year = local.getFullYear()

  return (
    year +
    separator +
    (month <= 9 ? '0' + month : month) +
    separator +
    (day <= 9 ? '0' + day : day)
  )
}

export const getUniqueId = (prefix = 'id') => `${prefix}-${uniqueId()}`

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })
