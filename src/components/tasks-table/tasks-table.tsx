"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { routesConfig } from "@/config/routes";
import { displayErrorReason, firstLetterCapital } from "@/lib/utils";
import { Task } from "@/types";
import { ArrowUpCircle, CheckCircle2, Circle, MoreHorizontal, XCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { DataTableFacetedFilter } from "./faceted-filter";
import { RemoveTaskMenuItem } from "./remove-task-dialog";

const taskColumns: ColumnDef<Task, any>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.original.id;

            return id.slice(0, 5).concat("...").concat(id.slice(-3));
        },
    },

    { accessorKey: "taskName", header: "Name" },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            if (status == "done") {
                return (
                    <Badge variant={"default"} className="bg-green-600">
                        Done
                    </Badge>
                );
            }

            if (status == "processing") {
                return (
                    <Badge variant={"default"} className="bg-cyan-600">
                        Processing
                    </Badge>
                );
            }

            if (status == "to_process" || status == "to_upload") {
                return (
                    <Badge variant={"default"} className="bg-amber-600">
                        To Process
                    </Badge>
                );
            }

            if (status == "failed") {
                return (
                    <Badge variant={"default"} className="bg-red-600">
                        Failed
                    </Badge>
                );
            }
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "taskType",
        header: "Type",
        cell: ({ row }) => {
            const task = row.original;
            return firstLetterCapital(task.taskType);
        },
    },
    {
        accessorKey: "creditsConsume",
        header: "Credits",
        cell: ({ row }) => {
            const { creditsConsume, status } = row.original;

            if (status != "done" && status !== "failed") {
                return "Waiting...";
            }

            return creditsConsume;
        },
    },
    {
        accessorKey: "resultPath",
        header: "Output",
        cell: ({ row }) => {
            const resultPath = row.original.resultPath;
            const taskType = row.original.taskType;

            if (row.original.status == "failed") {
                if (row.original.errorReason) {
                    return <span>{displayErrorReason(row.original.errorReason)}</span>;
                }
                return <span></span>;
            }

            if (!resultPath) {
                return <span>Waiting...</span>;
            }

            return (
                <Link
                    href={`${taskType == "analysis" ? routesConfig.analysisResult : routesConfig.summarizeResult}/${
                        row.original.id
                    }`}
                    className="underline underline-offset-4 hover:opacity-80"
                    target="_blank"
                >
                    result
                </Link>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original;
            const canBeRemoved = task.status == "done" || task.status == "failed";

            const [isOpen, setIsOpen] = useState(false);

            return (
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
                            Copy Task ID
                        </DropdownMenuItem>
                        {canBeRemoved && <RemoveTaskMenuItem taskId={task.id} onOpenChange={setIsOpen} />}

                        {/* <DropdownMenuSeparator /> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface DataTableProps {
    data: Task[];
}

const statuses = [
    {
        value: "to_process",
        label: "To Process",
        icon: Circle,
    },
    {
        value: "processing",
        label: "Processing",
        icon: ArrowUpCircle,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircle2,
    },
    {
        value: "failed",
        label: "Failed",
        icon: XCircle,
    },
];

export function TasksTable({ data }: DataTableProps) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable<Task>({
        data,
        columns: taskColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),

        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
        },
    });

    return (
        <div>
            <div className="flex items-center py-4 space-x-2">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("taskName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("taskName")?.setFilterValue(event.target.value)}
                    className="max-w-sm focus-visible:ring-transparent"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
                )}
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={taskColumns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        return table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
