import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Loader, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

import { addUserSchema } from "@/schema/manage/users"
import type { AddUser } from "@/types/manage/users"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"


export function AddUser() {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AddUser>({
        resolver: zodResolver(addUserSchema),
    });


    const onSubmit = async (values: z.infer<typeof addUserSchema>) => {
        try {
            setIsLoading(true);
            setError("");
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    password: "Password",
                    confirmPassword: "Password"
                }),
            });

            const data = await response.json();

            if (response.ok) {
                form.reset();
                setIsLoading(false);
                setError("");
                toast("User has been added successfully");
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
            setError('System error. Please try again later: ' + error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="text-lg">
                    <Plus />Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='w-full flex justify-center items-center flex-col'>
                    <DialogTitle className="text-3xl font-bold">Add New User</DialogTitle>
                </DialogHeader>
                <Card className='py-4 gap-2'>
                    <CardContent className="grid gap-4 pt-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
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
                                                <FormLabel className="after:content-['_*'] after:text-red-600 ">Date of birth</FormLabel>
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
                                                    <PopoverContent className="max-w-full w-[16rem] flex justify-center items-center" align="center">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            captionLayout="dropdown"
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
                                <div className="flex gap-2 items-start">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="after:content-['_*'] after:text-red-600 ">
                                                    Role
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full ">
                                                            <SelectValue placeholder="Select a role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                                        <SelectItem value="STAFF">Staff</SelectItem>
                                                        <SelectItem value="USER">User</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="after:content-['_*'] after:text-red-600 ">
                                                    Status
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full ">
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                                        <SelectItem value="INACTIVE">Deactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                </Card>
            </DialogContent>
        </Dialog>
    )
}
