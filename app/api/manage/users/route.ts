
import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/dal'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const page = url.searchParams.get("page") || "1"
    const limit = url.searchParams.get("limit") || "10"
    const accessToken = await verifySession()

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/admin/users?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json({
                message: 'Failed to fetch users from backend',
                backendMessage: errorText,
            }, { status: response.status })
        }

        const data = await response.json()
        console.log(data)
        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message || 'Unknown error',
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        let data: any;
        try {
            data = await res.json();
        } catch (err) {
            return NextResponse.json(
                { error: err },
                { status: 502 }
            );
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

        
        return NextResponse.json(
            { success: true, data: data.data },
            { status: 200 }
        );

    } catch (err) {
        console.error('Server Error:', err);
        return NextResponse.json({ error: 'System error' }, { status: 500 });
    }
}