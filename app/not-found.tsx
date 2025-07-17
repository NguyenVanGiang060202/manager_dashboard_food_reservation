"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center w-dvw h-dvh bg-muted">
            <Card className="max-w-md w-full text-center p-6">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
                    <p className="mb-6 text-muted-foreground">
                        The page you are looking for does not exist.
                    </p>
                    <Button variant="default">
                        <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}