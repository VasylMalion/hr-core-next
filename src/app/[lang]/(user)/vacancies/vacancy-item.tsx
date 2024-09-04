import { FunctionComponent } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { VacancyStatus, Vacancy, Theme, RoutePaths } from '@/common/types'
import { formatDate, useRouter } from '@/common/utils'
import AvatarIcon from '@/assets/images/avatar.png'
import AvatarWhiteIcon from '@/assets/images/avatar-white.png'
import { useTranslations } from 'next-intl'
import { generateRouteAsPath } from '@/common/utils'

type VacancyItemProps = Vacancy

const VacancyItem: FunctionComponent<VacancyItemProps> = ({
  id,
  position,
  location,
  description,
  createdAt,
  status,
  assignedTo,
}) => {
  const t = useTranslations('vacancies-list')
  const router = useRouter()

  const { resolvedTheme } = useTheme()

  const isDarkTheme = resolvedTheme === Theme.DARK

  const handleClick = () =>
    router.push(generateRouteAsPath(RoutePaths.VACANCY_DETAILS, { id }))

  return (
    <div
      data-testid="vacancy"
      onClick={handleClick}
      className="
          dark:bg-dark-100 min-h-[16rem] w-64 bg-white p-6 rounded-md 
          flex flex-col justify-between cursor-pointer
        "
    >
      <div>
        <div className="font-[ceraProBold]">{position}</div>
        <div className="font-[ceraProLight] pt-1">{location}</div>
      </div>
      <div>
        <div className="overflow-hidden">
          <div
            className="font-[ceraProLight] text-gray-500 text-sm pt-3 h-24
          text-ellipsis overflow-hidden whitespace-pre-wrap"
          >
            {description}
          </div>
        </div>
        <div className="grid gap-2 pt-4">
          <div className="flex justify-between">
            <div className="text-gray-500">{formatDate(createdAt)}</div>
            <div
              className={
                status === VacancyStatus.ACTIVE ? 'text-green' : 'text-red'
              }
            >
              {t(`tabs.${status}`)}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={isDarkTheme ? AvatarWhiteIcon : AvatarIcon}
              className="w-8 h-8"
              alt=""
            />
            <span>{`${assignedTo.name} ${assignedTo.surname}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VacancyItem
