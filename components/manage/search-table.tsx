'use client'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';





export default function SearchTable() {
    const form = useForm({
        defaultValues: {
            search: '',
        },
    });
    return (
        <div className=" flex items-center justify-between">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl className=''>
                                <div className="relative ">
                                    <Search className="absolute size-5 text-muted-foreground top-2 left-2" />
                                    <Input placeholder="Search..." {...field} className="pl-8 "/>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </Form>
        </div>
    )
}
