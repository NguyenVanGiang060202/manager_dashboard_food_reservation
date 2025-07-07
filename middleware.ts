import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/dal';

const protectedRoutes = ['/', 'manage/users','manage/categories','manage/menus','manage/tables','manage/orders','settings']
const publicRoutes = ['/login', '/signup']


export async function middleware(req: NextRequest) {
  const { accessToken } = await verifySession()
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/manage-users', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}