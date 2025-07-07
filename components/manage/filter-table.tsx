import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Trending", value: "trending" },
];

export default function FilterTable() {
    const [sortFilter, setSortFilter] = useState(sortOptions[0].value);
    return (
        <div className='w-fit flex justify-center items-center gap-4'>
            <Select value={sortFilter} onValueChange={setSortFilter}>
                <SelectTrigger className="w-[130px] cursor-pointer text-base font-semibold flex items-center gap-2">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select value={sortFilter} onValueChange={setSortFilter}>
                <SelectTrigger className="w-[130px] cursor-pointer text-base font-semibold flex items-center gap-2 ">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select value={sortFilter} onValueChange={setSortFilter}>
                <SelectTrigger className="w-[130px] cursor-pointer text-base font-semibold flex items-center gap-2 ">
                    <SelectValue placeholder="Select a fruit" />
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
