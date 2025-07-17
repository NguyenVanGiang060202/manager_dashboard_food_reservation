"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { signupFormSchema } from '@/schema/auth'
import { signupFormValues } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, GalleryVerticalEnd, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


export default function SignupPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<signupFormValues>({
        resolver: zodResolver(signupFormSchema),
    });



    const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {

        try {
            setIsLoading(true);
            setError("");

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/login');
            } else {
                if (data.errors && Array.isArray(data.errors)) {
                    const messages = data.errors.map((err: any) => `${err.field}: ${err.message}`).join('\n');
                    setError(messages);
                } else if (data.error) {
                    setError(data.error);
                } else {
                    setError('Register fail. Please try again');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('System error. Please try again later');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="grid min-h-svh lg:grid-cols-2 w-full">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-[28rem]">
                        <Card className='py-4 gap-2'>
                            <CardHeader className='w-full flex justify-center items-center flex-col'>
                                <CardTitle className="text-2xl">Create an account</CardTitle>
                                <CardDescription>
                                    Enter your email below to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 pt-4">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-2"
                                    >
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1">
                                                            Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                placeholder="e.g. Bonnie Green"
                                                                className="invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-600 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                                                                {...form.register(
                                                                    'name'
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1">
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                placeholder="example@gmail.com"
                                                                className="invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-600 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                                                                {...form.register(
                                                                    'email'
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="dateOfBirth"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Date of birth</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "dd/MM/yyyy")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="max-w-full w-[21rem] flex justify-center items-center" align="center">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) =>
                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                    }
                                                                    captionLayout="dropdown"
                                                                    className=''
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2 ">
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1">
                                                            Phone number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                placeholder="0123456789"
                                                                className="invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-600 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-2 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                                                                {...form.register(
                                                                    'phone'
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1">
                                                            Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                type="password"
                                                                {...form.register(
                                                                    'password'
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ }) => (
                                                    <FormItem>
                                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1">
                                                            Confirm Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                type="password"
                                                                {...form.register(
                                                                    'confirmPassword'
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button
                                            disabled={isLoading}
                                            className="w-full h-12 text-base"
                                            type="submit"
                                        >
                                            {isLoading ? <Loader /> : 'Create Account'}
                                        </Button>
                                        <div>
                                            {error && <p className="text-destructive text-sm">{error}</p>}
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter>
                                <div className="relative flex justify-center text-sm">
                                    <span className="">
                                        Already have an account?
                                    </span>
                                    <Link
                                        rel="next"
                                        href="/login"
                                        className="pl-1 underline font-bold"
                                    >
                                        Login Here
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block w-full h-full">
                <Image
                    src="/restaurant-image.jpg"
                    alt="Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
