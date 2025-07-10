"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Category } from "@/types/manage/categories"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Edit, Eye, Lock, MoreHorizontal, Trash2 } from "lucide-react"
import { toast } from "sonner"

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
		size: 30,
	},
	{
		accessorKey: '_id',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2 "
			>
				ID
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,

	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Name
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Description	
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
	},
	{
		accessorKey: 'isActive',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Active
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => (getValue() ? <Badge className="bg-green-500 text-white">ACTIVE</Badge> : <Badge className="bg-red-500 text-white">INACTIVE</Badge>),
	},
	{
		accessorKey: 'deleted',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Deleted
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => (getValue() ? <Badge variant="destructive">Yes</Badge> : <Badge variant="default">No</Badge>),
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Created At
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => {
			const date = getValue() as Date
			return format(date, 'dd/MM/yyyy')
		},
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Updated At
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => {
			const date = getValue() as Date
			return format(date, 'dd/MM/yyyy')
		},
	},
	{
		id: "actions",
		header: () => <div>Actions</div>,
		size: 70,
		cell: ({ row }) => {
			const category = row.original
			return (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => toast("Viewing category")}>
								<Eye className="mr-2 h-4 w-4" /> View
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => toast("Editing catogory")}>
								<Edit className="mr-2 h-4 w-4" /> Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => toast("Status category")}>
								<Lock className="mr-2 h-4 w-4" />
								{category.isActive ? "Deactivate" : "Activate"}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => toast("Deleting category")}
								className="text-red-600"
							>
								<Trash2 className="mr-2 h-4 w-4" /> Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]