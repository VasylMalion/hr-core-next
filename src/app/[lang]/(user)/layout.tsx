import { RedirectType } from 'next/navigation'
import { cookies } from 'next/headers'

import { getUserInfo, handleServerRedirect } from '@/common/utils'
import { LayoutContent } from './layout-content'
import { UserProvider } from '@/providers/user-content'
import { Suspense } from 'react'
import SuspensePreloader from '@/ui-components/SuspensePreloader/SuspensePreloader'

type TLayoutProps = {
  children: React.ReactNode
  params: { lang: string }
}

export default async function Layout({
  children,
  params: { lang },
}: TLayoutProps) {
  const session = await cookies().get('session')?.value

  if (!session)
    return await handleServerRedirect(`/${lang}/login`, RedirectType.replace)

  const user = await getUserInfo()

  return (
    <div suppressHydrationWarning={true}>
      <UserProvider userCookies={user} tokenCookies={session}>
        <div className="grid bg-white grid-cols-[1fr] md:grid-cols-[auto_1fr]">
          <LayoutContent user={user}>
            <Suspense fallback={<SuspensePreloader />}>{children}</Suspense>
          </LayoutContent>
        </div>
      </UserProvider>
    </div>
  )
}
