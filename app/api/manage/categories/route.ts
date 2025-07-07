
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/admin/categories?page=${page}&limit=${limit}`, {
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
                message: 'Failed to fetch categories from backend',
                backendMessage: errorText,
            }, { status: response.status })
        }

        const data = await response.json()
        console.log(data)
        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        console.error('API route error:', error)
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message || 'Unknown error',
        }, { status: 500 })
    }
}
