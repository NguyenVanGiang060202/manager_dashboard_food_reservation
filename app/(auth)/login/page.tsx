"use client"
import { GalleryVerticalEnd, Loader } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LoginFormValues } from "@/types/auth";
import { loginFormSchema } from "@/schema/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";

export default function LoginPage() {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuthStore()
    const router = useRouter()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {

        try {
            setIsLoading(true);
            setError("");

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })

            const data = await response.json();

            if (response.ok) {
                setUser(data.data);
                router.push('/dashboard');
            } else {
                if (data.errors && Array.isArray(data.errors)) {
                    const messages = data.errors.map((err: any) => `${err.field}: ${err.message}`).join('\n');
                    setError(messages);
                } else if (data.error) {
                    setError(data.error);
                } else {
                    setError('Login information incorrect. Please try again');
                }
            }
        }
        catch (error) {
            console.error('Login error:', error);
            setError('System error. Please try again later');
        }
        finally {
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
                    <div className="w-full max-w-96">
                        <Card className='py-4 gap-2'>
                            <CardHeader className='w-full flex justify-center items-center flex-col'>
                                <CardTitle className="text-2xl">Login</CardTitle>
                                <CardDescription>
                                    Enter your email below to login to your account
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
                                                                placeholder="example@gmal.com"
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
                                                                placeholder="••••••••"
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
                                        <div className="">
                                            <Link
                                                rel="help"
                                                href="/forgotpassword"
                                                className="text-xs text-right underline"
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </div>
                                        <Button
                                            disabled={isLoading}
                                            className="w-full h-12 text-base"
                                            type="submit"
                                        >
                                            {isLoading ? (
                                                <Loader />
                                            ) : (
                                                'Login'
                                            )}
                                        </Button>
                                        <div>
                                            {error && <p className="text-red-600">{error}</p>}
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="grid gap-4">
                                <div className="relative flex justify-center  text-sm">
                                    <span className="">
                                        Don&apos;t have an account?
                                    </span>
                                    <Link
                                        rel="next"
                                        href="/signup"
                                        className="pl-1 underline font-bold"
                                    >
                                        Signup
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
