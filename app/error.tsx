"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Error() {
  return (
    <div className="flex items-center justify-center w-dvw h-dvh bg-muted">
            <Card className="max-w-md w-full text-center p-6">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
                    <p className="mb-6 text-muted-foreground">
                        We apologize for the inconvenience. Please try again later.
                    </p>
                    <Button variant="default">
                        <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
  )
}