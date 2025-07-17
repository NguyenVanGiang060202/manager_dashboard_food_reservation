import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const sortOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
];

export default function FilterTable() {
    const [sortFilter, setSortFilter] = useState(sortOptions[0].value);
    const router = useRouter()
    const searchParams = useSearchParams()
    return (
        <div className='w-fit flex justify-center items-center gap-4'>
            <Select value={sortFilter} onValueChange={(value) => {
                setSortFilter(value)
                const params = new URLSearchParams(searchParams.toString())
                params.set("sort", value)
                router.replace(`?${params.toString()}`)
            }}>
                <SelectTrigger className="w-[140px] cursor-pointer text-base font-semibold flex items-center gap-2">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
