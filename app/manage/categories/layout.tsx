import Sidebar from '@/components/navigation/side-bar';
import React, { Suspense } from 'react'
import Loading from '@/app/loading'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full h-full max-w-screen mx-auto'>
        <Sidebar/>
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    </div>
  )
}
