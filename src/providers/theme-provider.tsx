'use client'
import { ThemeProvider as ThemeProviderLib } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderLib attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProviderLib>
  )
}
