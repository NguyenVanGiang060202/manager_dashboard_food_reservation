import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {
    try {
        const refreshToken = (await cookies()).get('refreshToken')?.value
        console.log("refresh token", refreshToken)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: refreshToken
            }),
        })

        let data: any
        try {
            data = await res.json()
        } catch (err) {
            return NextResponse.json(
                { error: err },
                { status: 502 }
            )
        }

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: data?.message || 'Refresh failed', 
                    errors: Array.isArray(data?.errors) ? data.errors : null,
                },
                { status: res.status }
            );
        }

        const response = NextResponse.json(
            { success: true, data: data.data },
            { status: 200 }
        )


        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'lax' as const,
            path: '/',
        }
        console.log("set cookies", data.accessToken, data.refreshToken)
        response.cookies.set('accessToken', data.accessToken, {...cookieOptions, maxAge: 60 * 60 * 24})
        response.cookies.set('refreshToken', data.refreshToken, {...cookieOptions, maxAge: 60 * 60 * 24})

        return response
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}