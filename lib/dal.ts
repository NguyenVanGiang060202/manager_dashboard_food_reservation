import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const accessToken = (await cookies()).get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  return accessToken
})