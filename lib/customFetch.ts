import { cookies } from "next/headers"

export async function customFetch<T = any>(url: string, option: RequestInit = {}): Promise<T> {
    try {

        const accessToken = (await cookies()).get('accessToken')?.value

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(option.headers as Record<string, string>),
        }

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`
        }

        const res = await fetch(url, {
            ...option,
            headers,
        })

        if (!res.ok) {
            let message = `HTTP error! status: ${res.status}`
            try {
                const errorData = await res.json()
                message = errorData.message || message
            } catch {
   
            }

            const error = new Error(message)
                ; (error as any).status = res.status
            throw error
        }


        return res.json()
    } catch (error) {
        console.error('customFetch error:', error)
        throw error
    }
}