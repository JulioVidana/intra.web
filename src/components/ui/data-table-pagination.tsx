import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react"
import { Table } from "@tanstack/react-table"
import { Button } from "./button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSize: number
  currentPage: number
  totalItems: number
  isLoading?: boolean
  handlePageSizeChange: (pageSize: number) => void
  handlePageChange: (pageNumber: number) => void
}

export function DataTablePagination<TData>({
  table,
  pageSize,
  currentPage,
  totalItems,
  handlePageChange,
  handlePageSizeChange
}: DataTablePaginationProps<TData>) {
  const totalPages = Math.ceil(totalItems / pageSize)
  const canGoNext = currentPage < totalPages - 1
  const canGoPrevious = currentPage > 0

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex flex-wrap items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium whitespace-nowrap">Filas por página</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(parseInt(value))
              table.setPagination({
                pageIndex: 0,
                pageSize: parseInt(value),
              })
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium whitespace-nowrap">
          Página {currentPage + 1} de {totalPages || 1}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 text-black"
            onClick={() => {
              const newPage = Math.max(0, currentPage - 1)
              handlePageChange(newPage)
              table.previousPage()
            }}
            disabled={!canGoPrevious}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 text-black"
            onClick={() => {
              const newPage = currentPage + 1
              handlePageChange(newPage)
              table.nextPage()
            }}
            disabled={!canGoNext}
          >
            <span className="sr-only">Ir a la siguiente página</span>
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}