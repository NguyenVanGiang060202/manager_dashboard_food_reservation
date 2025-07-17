'use client'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDebounce, useDebouncedCallback } from 'use-debounce';




export default function SearchTable() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('search') ?? ''
    const [query, setQuery] = useState(initialQuery)

    const [debouncedQuery] = useDebounce(query, 500)

    useEffect(() => {
        const currentSearch = searchParams.get('search') ?? ''
        if (debouncedQuery !== currentSearch) {
            const searchParamsObj = new URLSearchParams(searchParams.toString())
            if (debouncedQuery) {
                searchParamsObj.set('search', debouncedQuery)
            } else {
                searchParamsObj.delete('search')
            }
            const newUrl = `?${searchParamsObj.toString()}`
            router.replace(newUrl)
        }
    }, [debouncedQuery, router, searchParams])

    return (
        <div className=" flex items-center justify-between">
            <div className="relative ">
                <Search className="absolute size-5 text-muted-foreground top-2 left-2" />
                <Input placeholder="Search..." className="pl-8 " onChange={e => setQuery(e.target.value)} />
            </div>
        </div>
    )
}
