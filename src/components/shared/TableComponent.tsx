"use client";
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//
// 🧠 1. Composable Hook untuk Logika Table
//
export function useDataTable<TData>(
  data: TData[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return { table, columnFilters, setColumnFilters };
}

//
// 🧱 2. Komponen DataTable (Composable)
//
interface DataTableProps<TData, TValue> {
  table: ReturnType<typeof useReactTable<TData>>;
  columns: ColumnDef<TData, TValue>[];
  searchKey?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  
}

export function DataTable<TData, TValue>({
  table,
  columns,
  searchKey,
  showSearch = true,
  showPagination = true,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="w-full py-5">
      {/* 🔍 Optional Search Input */}
      {showSearch && searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn(searchKey)?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* 📋 Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id }>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>


          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Optional Pagination */}
      {showPagination && (
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
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
