import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/dal';

const protectedRouteRegex = [
    /^\/$/,
    /^\/manage\/users(\/.*)?$/,
    /^\/manage\/categories(\/.*)?$/,
    /^\/manage\/menus(\/.*)?$/,
    /^\/manage\/tables(\/.*)?$/,
    /^\/manage\/orders(\/.*)?$/,
    /^\/settings(\/.*)?$/,
]

const publicRouteRegex = [
    /^\/login(\/.*)?$/,
    /^\/signup(\/.*)?$/,
]


export async function middleware(req: NextRequest) {
    const accessToken = await verifySession()
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRouteRegex.some(r => r.test(path))
    const isPublicRoute = publicRouteRegex.some(r => r.test(path))

    if (!accessToken && isProtectedRoute && path !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (accessToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/manage/users', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}