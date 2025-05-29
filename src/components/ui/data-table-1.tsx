"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as TableInstance,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showPagination?: boolean
  showSelectionCount?: boolean
  tableInstanceRef?: (table: TableInstance<TData>) => void
  isLoading?: boolean
  rowsPerPage?: number
  manualPagination?: {
    pageIndex: number
    pageSize: number
    onChange: (pagination: { pageIndex: number; pageSize: number }) => void
    totalItems: number
  }

}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination = true,
  showSelectionCount = true,
  tableInstanceRef,
  isLoading = false,
  rowsPerPage = 10,
  manualPagination
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: !!manualPagination,
    pageCount: manualPagination ? Math.ceil(manualPagination.totalItems / manualPagination.pageSize) : undefined,
    onPaginationChange: manualPagination
      ? (updater) => {
        const newPagination =
          typeof updater === "function"
            ? updater({
              pageIndex: manualPagination.pageIndex,
              pageSize: manualPagination.pageSize,
            })
            : updater
        manualPagination.onChange(newPagination)
      }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: manualPagination
        ? {
          pageIndex: manualPagination.pageIndex,
          pageSize: manualPagination.pageSize,
        }
        : undefined,
    },
  })

  React.useEffect(() => {
    if (tableInstanceRef) {
      tableInstanceRef(table)
    }
  }, [table, tableInstanceRef])





  const TableSkeleton = () => {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columns.length }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: manualPagination?.pageSize || rowsPerPage }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns.length }).map((_, colIndex) => (
                    <TableCell key={`${rowIndex}-${colIndex}`}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {(showPagination || showSelectionCount) && (
          <div className="flex items-center justify-end space-x-2 py-4">
            {showSelectionCount && (
              <div className="flex-1">
                <Skeleton className="h-5 w-40" />
              </div>
            )}
            {showPagination && (
              <div className="space-x-2 flex">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((_, index) => (
                  <TableHead key={index}>
                    <div className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(() => {
              const rowModel = table?.getRowModel?.()
              if (!rowModel) {
                return (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No se pudieron cargar los datos.
                    </TableCell>
                  </TableRow>
                )
              }
              return rowModel.rows?.length ? (
                rowModel.rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )
            })()}
          </TableBody>
        </Table>
      </div>
      {(showPagination || showSelectionCount) && (
        <div className="flex items-center justify-end space-x-2 py-4">

          {showPagination && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              {Array.from({ length: 5 }, (_, i) => {
                const pageIndex = table.getState().pagination.pageIndex;
                const totalPages = table.getPageCount();
                let start = Math.max(0, Math.min(pageIndex - 2, totalPages - 5));
                const currentPage = start + i;

                if (currentPage < totalPages) {
                  return (
                    <Button
                      key={currentPage}
                      variant={pageIndex === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(currentPage)}
                    >
                      {currentPage + 1}
                    </Button>
                  );
                }
                return null;
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

