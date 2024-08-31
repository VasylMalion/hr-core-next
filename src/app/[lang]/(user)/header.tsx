'use client'
import { FunctionComponent } from 'react'
import { RedirectType } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import {
  handleServerRedirect,
  setServerCookie,
  usePathname,
  useRouter,
} from '@/common/utils'
import { Lang, RoutePaths } from '@/common/types'
import { Button } from '@/ui-components'

import DashboardIcon from '@/assets/svgs/DashboardIcon'
import UserIcon from '@/assets/svgs/UserIcon'
import VacanciesIcon from '@/assets/svgs/VacanciesIcon'
import CandidatesIcon from '@/assets/svgs/CandidatesIcon'
import StructureIcon from '@/assets/svgs/StructureIcon'
import LogOutIcon from '@/assets/svgs/LogoutIcon'
import HamburgerIcon from '@/assets/svgs/HamburgerIcon'
import LanguageIcon from '@/assets/svgs/LanguageIcon'

type HeaderProps = {
  setIsSidebarOpen: (value: boolean | ((prev: boolean) => boolean)) => void
}

const Header: FunctionComponent<HeaderProps> = ({ setIsSidebarOpen }) => {
  const t = useTranslations('header')
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  async function handleLogout() {
    await setServerCookie('session', '', {
      path: '/',
      maxAge: 0,
    })
    await handleServerRedirect(`/${locale}/login`, RedirectType.replace)
  }

  function onSelectChange() {
    const nextLocale = locale === Lang.ua ? Lang.en : Lang.ua

    router.replace(pathname, { locale: nextLocale })
  }

  const getCase = (path: string) => `/${path.split('/')[1]}`
  const getContent = () => {
    switch (getCase(pathname)) {
      case RoutePaths.DASHBOARD: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className="dark:fill-white" />,
        }
      }
      case RoutePaths.PROFILE: {
        return {
          title: t('profile'),
          icon: <UserIcon className="dark:fill-white" />,
        }
      }
      case RoutePaths.VACANCIES: {
        return {
          title: t('vacancies'),
          icon: <VacanciesIcon className="dark:fill-white" />,
        }
      }
      case RoutePaths.CANDIDATES: {
        return {
          title: t('candidates'),
          icon: <CandidatesIcon className="dark:fill-white" />,
        }
      }
      case RoutePaths.EMPLOYEES: {
        return {
          title: t('employees'),
          icon: <StructureIcon className="dark:fill-white" />,
        }
      }
      default: {
        return {
          title: t('dashboard'),
          icon: <DashboardIcon className="dark:fill-white" />,
        }
      }
    }
  }

  const { title, icon } = getContent()

  return (
    <div
      className="
        fixed h-20 top-0 bg-white flex items-center dark:bg-dark-200
        border-b border-b-gray-300 px-8 py-4 z-10 overflow-y-auto
        w-full md:w-content
      "
    >
      <HamburgerIcon
        id="hamburger-icon"
        className="w-8 h-8 stroke-black dark:stroke-white md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div className="flex gap-2 items-center mx-auto dark:text-white">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="hidden md:flex justify-end">
        <div className="border-r border-r-grayLight">
          <Button
            icon={<LanguageIcon className="w-5 h-5 dark:stroke-grayLight" />}
            type="secondary"
            onClick={() => onSelectChange()}
            className="dark:!text-grayLight"
          >
            {t('language')}
          </Button>
        </div>
        <Button
          icon={<LogOutIcon className="w-5 h-5 dark:stroke-grayLight" />}
          type="secondary"
          onClick={handleLogout}
          className="dark:!text-grayLight"
        >
          {t('logout')}
        </Button>
      </div>
    </div>
  )
}

export default Header
