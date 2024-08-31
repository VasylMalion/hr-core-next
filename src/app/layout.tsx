import { Suspense } from 'react'
import type { Metadata } from 'next'

import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import SuspensePreloader from '@/ui-components/SuspensePreloader/SuspensePreloader'

export const metadata: Metadata = {
  title: 'HR Core',
  description: 'HR Core app',
}

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <Suspense fallback={<SuspensePreloader fullView />}>
          <QueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  )
}
