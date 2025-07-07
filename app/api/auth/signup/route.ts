import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
        return NextResponse.json({ error: err }, { status: 500 });
    }
}