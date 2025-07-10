"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from "@/types/manage/users"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Edit, Eye, Lock, MoreHorizontal, Trash2 } from "lucide-react"
import { toast } from "sonner"

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'email',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Email
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
	},
	{
		accessorKey: 'dateOfBirth',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Date of Birth
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
		accessorKey: 'phone',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Phone
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Role
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => {
			const role = getValue() as string;

			const roleColors: Record<string, string> = {
				ADMIN: "bg-green-500",
				STAFF: "bg-yellow-500",
				USER: "bg-red-500",
			};

			return (
				<Badge className={`${roleColors[role] ?? "bg-gray-500"} text-white`}>
					{role}
				</Badge>
			);
		}
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Status
				{column.getIsSorted() === "asc" ? <ArrowUpAZ className="size-6" /> :
					column.getIsSorted() === "desc" ? <ArrowDownAZ className="size-6" /> : <ArrowUpDown className="size-6" />}
			</div>
		),
		enableResizing: true,
		cell: ({ getValue }) => (getValue() === "ACTIVE" ? <Badge className="bg-green-500 text-white">ACTIVE</Badge> : <Badge className="bg-red-500 text-white">INACTIVE</Badge>),
	},
	{
		accessorKey: 'isDeleted',
		header: ({ column }) => (
			<div
				onClick={() => column.toggleSorting()}
				className="cursor-pointer flex items-center gap-2"
			>
				Is Deleted
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
			const user = row.original
			return (
				<div className="text-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => toast("Viewing user")}>
								<Eye className="mr-2 h-4 w-4" /> View
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => toast("Editing user")}>
								<Edit className="mr-2 h-4 w-4" /> Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => toast("Status user")}>
								<Lock className="mr-2 h-4 w-4" />
								{user.status === "ACTIVE" ? "Deactivate" : "Activate"}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => toast("Deleting user")}
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