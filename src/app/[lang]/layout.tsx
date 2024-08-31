import SuspensePreloader from '@/ui-components/SuspensePreloader/SuspensePreloader'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Suspense } from 'react'

export default async function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <div suppressHydrationWarning={true}>
      <Suspense fallback={<SuspensePreloader fullView />}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </Suspense>
    </div>
  )
}
