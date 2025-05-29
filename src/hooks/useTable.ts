import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  pageKey: string | null
  defaultSelectedRowIds?: Record<string, boolean> // Agregado
}

export default function useTable<TData>({
  columns,
  data,
  defaultSelectedRowIds,
}: DataTableProps<TData>) {

const [sorting, setSorting] = useState<SortingState>([])
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(defaultSelectedRowIds ?? {})


const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: setRowSelection,
  getRowId: (row: any) => row.id.toString(), // <- Agregado
  state: {
    sorting,
    columnFilters,
    rowSelection,
    pagination: {
      pageIndex: 0,
      pageSize: data.length,
    },
  },
})



  const onChangeRowsPerPage = (rowsPerPage : number) => {
    table.setPagination({
      pageIndex: 0,
      pageSize: rowsPerPage,
    })
  }

  const onChangePreviousPage = () => {
   table.previousPage()
  }

  const onChangeNextPage = () => {
    table.nextPage()
  }



  return {
    table,
    onChangeRowsPerPage,
    onChangePreviousPage,
    onChangeNextPage,
  }
}
