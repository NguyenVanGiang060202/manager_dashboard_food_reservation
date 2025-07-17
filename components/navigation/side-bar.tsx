"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { AppWindow, Armchair, ArrowRightFromLine, Hamburger, List, ListChecks, LogOut, Settings, Users } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { DialogDescription, DialogTitle } from '../ui/dialog'


export default function Sidebar() {

    const { logout } = useAuthStore()
    const router = useRouter()

    async function handleLogout() {
        await logout()
        router.push('/login')
    }
    return (
        <>
            <div className=" max-h-screen h-dvh bg-white border-r border-gray-200 flex flex-col p-4 shadow-lg">
                <div className="flex flex-col items-center gap-4 w-full pb-10">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className='size-12 p-0'>
                                <ArrowRightFromLine className='size-8' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left' className='w-fit'>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                            <div className="w-fit max-h-screen h-dvh flex flex-col p-10 ">
                                <div className="flex items-center gap-4 w-full pb-10">
                                    <Avatar className="border size-12 rounded-md">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="Image user" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="font-bold text-lg">
                                        Food Booking
                                    </div>
                                </div>
                                <div className="h-full flex mt-4 w-full flex-col gap-8">
                                    <Link href='/dashboard'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <AppWindow className='size-8' />
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Link href='/manage/users'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <Users className='size-8' />
                                            Manage Users
                                        </Button>
                                    </Link>
                                    <Link href='/manage/categories'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <List className='size-8' />
                                            Manage Categories
                                        </Button>
                                    </Link>
                                    <Link href='/manage/menus'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <Hamburger className='size-8' />
                                            Manage Menus
                                        </Button>
                                    </Link>
                                    <Link href='/manage/tables'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <Armchair className='size-8' />
                                            Manage Tables
                                        </Button>
                                    </Link>
                                    <Link href='/manage/orders'>
                                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                                            <ListChecks className='size-8' />
                                            Manage Orders
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex">
                                    <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none' onClick={handleLogout}>
                                        <LogOut className='size-8' />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Avatar className="border size-12 rounded-md">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Image user" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="h-full flex mt-4 w-full flex-col gap-8">
                    <Link href='/dashboard'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <AppWindow className='size-8' />
                        </Button>
                    </Link>
                    <Link href='/manage/users'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <Users className='size-8' />
                        </Button>
                    </Link>
                    <Link href='/manage/categories'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <List className='size-8' />
                        </Button>
                    </Link>
                    <Link href='/manage/menus'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <Hamburger className='size-8' />
                        </Button>
                    </Link>
                    <Link href='/manage/tables'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <Armchair className='size-8' />
                        </Button>
                    </Link>
                    <Link href='/manage/orders'>
                        <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none'>
                            <ListChecks className='size-8' />
                        </Button>
                    </Link>
                </div>
                <div className="flex">
                    <Button className='w-full h-fit rounded-md text-bold text-lg flex bg-white justify-start gap-4 hover:bg-indigo-800 text-indigo-800 hover:text-indigo-50 transition-colors shadow-none' onClick={handleLogout}>
                        <LogOut className='size-8' />
                    </Button>
                </div>

            </div>
        </>
    )
}
