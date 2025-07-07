import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })


  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })

  return response
}
