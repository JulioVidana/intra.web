import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  dense?: boolean

  pagination?: boolean
  pageSize: number
  currentPage?: number
  totalItems?: number
  handlePageSizeChange: (pageSize: number) => void
  handlePageChange: (pageNumber: number) => void
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  dense,

  pagination = true,
  pageSize,
  currentPage = 0,
  totalItems = 0,
  handlePageSizeChange,
  handlePageChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={dense ? "h-10 px-2" : "h-12 px-4"}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(isLoading ? [...Array(5)] : table.getRowModel().rows).map(
              (row, index) =>
                row ? (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={onRowClick ? "cursor-pointer" : ""}
                  >
                    {row.getVisibleCells().map((cell: any) =>
                      cell.column.id === "actions" ? (
                        <TableCell
                          key={cell.id}
                          className={dense ? "p-2" : "p-4"}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={cell.id}
                          className={dense ? "p-2" : "p-4"}
                          onClick={() => onRowClick?.(row.original)}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ) : (
                  <TableRow key={index}>
                    {table.getHeaderGroups()[0].headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          <Skeleton className=" w-full h-[20px]" />
                        </TableHead>
                      )
                    })}
                  </TableRow>
                )
            )}
            {!isLoading && !table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pageSize >= 0 && (
        <DataTablePagination
          table={table}
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={totalItems}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  )
}
