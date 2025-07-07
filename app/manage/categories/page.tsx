'use client'
import React from 'react'
import { DataTable } from '../../../components/manage/data-table'
import { columns } from '../../../components/manage/columns'
import { customFetch } from '@/lib/customFetch'
import useSWR from 'swr'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'


// const fetcher = (url: string) => customFetch(url)
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function page() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const page = Number(searchParams.get("page") || 1)
	const limit = Number(searchParams.get("limit") || 10)
	

	const { data, error, isLoading } = useSWR(`/api/manage/categories?page=${page}&limit=${limit}`, fetcher, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
	})

	console.log(data)

	const nextPage = () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("page", String(page + 1))
		router.push(`?${params.toString()}`)
	}

	const prevPage = () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("page", String(page - 1))
		router.push(`?${params.toString()}`)
	}


	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>
	if (data) {
		return (
			<div className='min-h-screen max-w-screen w-full h-full p-4 overflow-hidden border space-y-4 '>
				<div className="w-full flex justify-between border rounded-lg p-4 shadow-lg">
					<div className="flex justify-center items-center gap-2">
						<List className='size-8 text-primary' />
						<h3 className="font-bold text-3xl text-primary">Manage Categories</h3>
					</div>
					<div className="flex justify-center items-center gap-4">
						<Select value={String(limit)} onValueChange={(value) => {
							const params = new URLSearchParams(searchParams.toString())
							params.set("limit", value)
							router.push(`?${params.toString()}`)
						}}>
							<SelectTrigger className="w-[160px]">
								<SelectValue placeholder="Number of Pages" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Pages</SelectLabel>
									<SelectItem value="5">5 Pages</SelectItem>
									<SelectItem value="10">10 Pages</SelectItem>
									<SelectItem value="20">20 Pages</SelectItem>
									<SelectItem value="0">All</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="rounded-lg border w-full h-full shadow-lg">
					<DataTable columns={columns} data={data.data} />
					<div className="flex justify-end items-center gap-4 py-4 p-2">
						<Button
							variant="outline"
							onClick={prevPage}
							disabled={page <= 1}
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Previous
						</Button>
						<Button
							variant="outline"
							onClick={nextPage}
							disabled={page >= data.totalPages}
						>
							Next
							<ArrowRight className="mr-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		)
	}

}
