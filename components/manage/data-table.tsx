"use client"
import {
    ColumnDef,
    ColumnPinningState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import FilterTableUsers from "./filter-table"
import SearchTableUser from "./search-table"
import EditMultipleUser from "./menu-action"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        left: ["select"],
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnPinningChange: setColumnPinning,
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        state: {
            rowSelection,
            sorting,
            columnPinning,
        },
    })

    if (!data || !table.getRowModel().rows.length) {
        return (
            <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
                No Data
            </div>
        )
    }

    return (
        <div className=" p-4 border-b w-full h-[calc(100vh-14rem)] overflow-auto space-y-4">
            <div className="w-full flex justify-between items-center gap-4 ">
                <div className="w-full flex justify-start items-center gap-4">
                    <SearchTableUser />
                    <FilterTableUsers />
                </div>
                {Object.keys(rowSelection).length !== 0 && <EditMultipleUser />}
            </div>
            <Table className="table-fixed w-full ">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const pinned = header.column.getIsPinned()
                                const isSticky = pinned === "left" || pinned === "right"
                                const style: React.CSSProperties = {
                                    width: header.getSize(),
                                    zIndex: isSticky ? 10 : undefined,
                                    position: isSticky ? "sticky" : undefined,
                                    left:
                                        pinned === "left" ? header.column.getStart("left") : undefined,
                                    right:
                                        pinned === "right" ? header.column.getStart("right") : undefined,
                                    background: "white",
                                }

                                return (
                                    <TableHead
                                        key={header.id}
                                        style={style}
                                        {...{
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                        }}
                                        className={`relative text-lg ${header.column.getCanResize()
                                            ? "cursor-col-resize select-none"
                                            : ""
                                            }`}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}

                                        {header.column.getCanResize() && (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className="absolute right-0 top-0 h-full w-1 bg-transparent cursor-col-resize"
                                            />
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="hover:bg-indigo-600 hover:text-white transition-colors data-[state=selected]:bg-indigo-600 data-[state=selected]:text-white"
                            onClick={() => row.toggleSelected()}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const pinned = cell.column.getIsPinned()
                                const isSticky = pinned === "left" || pinned === "right"
                                const style: React.CSSProperties = {
                                    width: cell.column.getSize(),
                                    zIndex: isSticky ? 5 : undefined,
                                    position: isSticky ? "sticky" : undefined,
                                    left:
                                        pinned === "left" ? cell.column.getStart("left") : undefined,
                                    right:
                                        pinned === "right" ? cell.column.getStart("right") : undefined,
                                }

                                return (
                                    <TableCell
                                        key={cell.id}
                                        style={style}
                                        className="text-lg truncate max-w-[200px] "
                                        title={String(cell.getValue())}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}
