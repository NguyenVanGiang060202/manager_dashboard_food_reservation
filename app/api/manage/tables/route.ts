import { verifySession } from '@/lib/dal'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const page = url.searchParams.get("page") || "1"
    const limit = url.searchParams.get("limit") || "10"



    try {
        const accessToken = await verifySession()

        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }


        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        if (response.status === 401) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json({
                message: 'Failed to fetch tables from backend',
                backendMessage: errorText,
            }, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message || 'Unknown error',
        }, { status: 500 })
    }
}
