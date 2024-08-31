'use server'
import { cookies } from 'next/headers'
import { redirect as NextRedirect, type RedirectType } from 'next/navigation'

export async function getServerCookie(
  name: string,
): Promise<string | undefined> {
  const val = await cookies().get(name)?.value
  return val as string | undefined
}

export async function setServerCookie(
  name: string,
  value: string,
  options?: { maxAge?: number; path?: string; domain?: string },
) {
  await cookies().set(name, value, options)
  return true
}

export async function handleServerRedirect(path: string, type: RedirectType) {
  return NextRedirect(path, type)
}
