import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        let data: any
        try {
            data = await res.json()
        } catch (err) {
            return NextResponse.json(
                { error: 'Cannot read respone from server' },
                { status: 502 }
            )
        }

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: data?.message || 'Register failed', 
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
        }

        response.cookies.set('accessToken', data.accessToken, cookieOptions)
        response.cookies.set('refreshToken', data.refreshToken, cookieOptions)

        return response
    } catch (err) {
        return NextResponse.json({ error: 'System Error' }, { status: 500 })
    }
}
