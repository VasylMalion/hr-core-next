'use client'
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocale, useTranslations } from 'next-intl'
import { RedirectType } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { Button, Typography } from '@/ui-components'
import { Lang, RoleTypes, RoutePaths, Theme, UserInfo } from '@/common/types'
import {
  handleServerRedirect,
  setServerCookie,
  Link,
  usePathname,
  useRouter,
} from '@/common/utils'

import LogoLight from '@/assets/images/logo-light.png'
import LogoDark from '@/assets/images/logo-dark.png'
import DashboardIcon from '@/assets/svgs/DashboardIcon'
import UserIcon from '@/assets/svgs/UserIcon'
import VacanciesIcon from '@/assets/svgs/VacanciesIcon'
import CandidatesIcon from '@/assets/svgs/CandidatesIcon'
import StructureIcon from '@/assets/svgs/StructureIcon'
import LogOutIcon from '@/assets/svgs/LogoutIcon'
import LanguageIcon from '@/assets/svgs/LanguageIcon'
import DarkModeIcon from '@/assets/svgs/DarkModeIcon'
import LightModeIcon from '@/assets/svgs/LightModeIcon'

type Links = Array<{
  title: string
  path: string
  icon: ReactNode
}>

type NavbarProps = {
  user: UserInfo
  setIsSidebarOpen?: (value: boolean) => void
}

const Navbar: FunctionComponent<NavbarProps> = ({ setIsSidebarOpen, user }) => {
  const t = useTranslations('navbar')
  const isPhoneLarge = useMediaQuery({ maxWidth: 767 })
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDarkTheme = resolvedTheme === Theme.DARK

  async function handleLogout() {
    await setServerCookie('session', '', {
      path: '/',
      maxAge: 0,
    })
    await handleServerRedirect(`/${locale}/login`, RedirectType.replace)
  }

  const handleLang = () => {
    const nextLocale = locale === Lang.ua ? Lang.en : Lang.ua

    router.replace(pathname, { locale: nextLocale })
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node | null

      const condition =
        isPhoneLarge &&
        ref.current &&
        (event.target as HTMLDivElement).id !== 'hamburger-icon' &&
        (!ref.current.contains(target) ||
          (ref.current.contains(target) &&
            (event.target as HTMLDivElement).tagName === 'BUTTON') ||
          (event.target as HTMLDivElement).tagName === 'IMG')

      if (condition) setIsSidebarOpen?.(false)
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isPhoneLarge, setIsSidebarOpen])

  const menuLinks: Links = [
    {
      title: 'dashboard',
      path: RoutePaths.DASHBOARD,
      icon: <DashboardIcon className="fill-current dark:fill-white" />,
    },
    {
      title: 'profile',
      path: RoutePaths.PROFILE,
      icon: <UserIcon className="fill-current dark:fill-white" />,
    },
  ]

  const recruitmentLinks = [
    {
      title: 'vacancies',
      path: RoutePaths.VACANCIES,
      icon: <VacanciesIcon className="fill-current dark:fill-white" />,
    },
    {
      title: 'candidates',
      path: RoutePaths.CANDIDATES,
      icon: <CandidatesIcon className="fill-current dark:fill-white" />,
    },
  ]

  const organizationLinks = [
    {
      title: 'employees',
      path: RoutePaths.EMPLOYEES,
      icon: <StructureIcon className="fill-current dark:fill-white" />,
    },
  ]

  const isActive = (path: string) => pathname.startsWith(path)

  const toggleTheme = () => setTheme(isDarkTheme ? Theme.LIGHT : Theme.DARK)

  const mobileButtons = [
    ...(mounted
      ? [
          {
            title: isDarkTheme ? t('lightMode') : t('darkMode'),
            icon: isDarkTheme ? (
              <LightModeIcon className="dark:fill-grayLight" />
            ) : (
              <DarkModeIcon className="fill-current" />
            ),
            onClick: toggleTheme,
          },
        ]
      : []),
    {
      title: t('language'),
      icon: <LanguageIcon className="w-5 h-5 dark:stroke-grayLight" />,
      onClick: handleLang,
    },
    {
      title: t('logout'),
      icon: <LogOutIcon className="w-5 h-5 dark:stroke-grayLight" />,
      onClick: handleLogout,
    },
  ]

  const controlButtons = [
    {
      title: isDarkTheme ? t('lightMode') : t('darkMode'),
      icon: isDarkTheme ? (
        <LightModeIcon className="dark:!fill-grayLight" />
      ) : (
        <DarkModeIcon className="fill-current" />
      ),
      onClick: () => setTheme(isDarkTheme ? Theme.LIGHT : Theme.DARK),
    },
  ]

  const getSection = (title: string, links: Links) => (
    <div className="mt-4">
      <Typography appearance="subtitle" className="pl-6 mb-2 text-gray-[600]">
        {title}
      </Typography>
      <div className="flex flex-col gap-1">
        {links.map((item, index) => (
          <Link key={index} href={item.path}>
            <Button
              icon={item.icon}
              type={isActive(item.path) ? 'primary' : 'secondary'}
              className="w-full dark:text-white"
            >
              {t(item.title)}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )

  const getControlSection = controlButtons.map((item, index) => (
    <Button
      key={index}
      onClick={(event) => {
        event.stopPropagation()
        item.onClick?.()
      }}
      icon={item.icon}
      type="secondary"
      className="dark:!text-grayLight"
    >
      {t(item.title)}
    </Button>
  ))

  const mobileButtonsContent = mobileButtons.map((item, index) => (
    <Button
      key={index}
      icon={item.icon}
      type="secondary"
      onClick={(event) => {
        event.stopPropagation()
        item.onClick?.()
      }}
    >
      {item.title}
    </Button>
  ))

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-dark-200 dark:text-white dark:border-r-black
        flex flex-col justify-between sticky top-0 py-8 border-r border-r-gray-200 
        h-content md:h-screen w-navbar px-3"
    >
      <div>
        <Image
          alt=""
          src={isDarkTheme ? LogoDark : LogoLight}
          className="px-10 mx-auto cursor-pointer mb-6"
          onClick={() => router.push(RoutePaths.DASHBOARD)}
        />
        <div>
          {getSection(t('menu'), menuLinks)}
          {user?.role === RoleTypes.ADMIN &&
            getSection(t('recruitment'), recruitmentLinks)}
          {getSection(t('organization'), organizationLinks)}
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-1">{getControlSection}</div>
      <div className="flex md:hidden flex-col gap-1">
        {mobileButtonsContent}
      </div>
    </div>
  )
}

export default Navbar
