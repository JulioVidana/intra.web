import {
    ColumnDef,
    flexRender,
    Table,
  } from "@tanstack/react-table"
  import {
    Table as TheTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./table"
  import { Skeleton } from "@/components/ui/skeleton"
  import {
    Collapsible,
    CollapsibleContent,
  } from '@/components/ui/collapsible'
import React from "react"
import { cn } from "@/lib/utils"
  
  interface DataTableProps<TData, TValue> {
    table: Table<TData>
    columns: ColumnDef<TData, TValue>[]
    isLoading?: boolean
    dense?: boolean
    pagination?: boolean
    pageKey?: string | null
    pageSize?: number
    previousPageKey?: Array<string | null>
    onNextPageChange?: () => void
    onChangePageSize?: (pageSize: number) => void
    onPreviousPageChange?: () => void
    onRowClick?: (row: TData) => void
    renderCollapsibleContent?: (row: TData) => React.ReactNode;
    getRowClassName?: (row: { original: TData }) => string;
  }
  
  export function DataTable<TData, TValue>({
    table,
    columns,
    isLoading,
    onRowClick,
    renderCollapsibleContent,
    getRowClassName,
    dense
  }: DataTableProps<TData, TValue>) {
  
  
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <TheTable>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn("h-12 px-4", dense && "h-8 px-2")}
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
            {(isLoading ? [...Array(5)] : table.getRowModel().rows).map((row, index) =>
  row ? (
    <React.Fragment key={row.id}>
      <Collapsible asChild>
        <TableRow
          data-state={row.getIsSelected() && "selected"}
          className={cn(
            onRowClick && "cursor-pointer",
            getRowClassName?.(row)
          )}
        >
          {row.getVisibleCells().map((cell: any) =>
            cell.column.id === "actions" ? (
              <TableCell key={cell.id} className={cn("p-4", dense && "p-2")}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ) : (
              <TableCell
                key={cell.id}
                className={cn("p-4", dense && "p-2")}
                onClick={() => onRowClick?.(row.original)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            )
          )}
        </TableRow>
      </Collapsible>

      {renderCollapsibleContent && (
        <CollapsibleContent className={cn("bg-gray-100", dense && "p-2")} asChild>
          <tr>
            <td colSpan={columns.length}>
              <div>{renderCollapsibleContent(row.original)}</div>
            </td>
          </tr>
        </CollapsibleContent>
      )}
    </React.Fragment>
  ) : (
    <TableRow key={index}>
      {table.getHeaderGroups()[0].headers.map((header) => (
        <TableHead key={header.id}>
          <Skeleton className="w-full h-[20px]" />
        </TableHead>
      ))}
    </TableRow>
  )
)}

                
            </TableBody>
          </TheTable>
        </div>
  
      </div>
    )
  }
  