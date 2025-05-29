import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table-simple"
import { Button } from "@/components/ui/button"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import useTable from "@/hooks/useTable"
import BaseModal from "@/components/common/base-modal"
import EquipoDetails from "../../equipos/EquipoDetails"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  equiposColumns: ColumnDef<Equipos>[]
  equipos: Equipos[]
  isLoading: boolean
  pageKey: string | null
  handlePageNextChange: () => void
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  isNewlyAdded?: (equipo: Equipos) => boolean
  isSmall?: boolean
  Selected?: Equipos[]
  onSelect?: (equipos: Equipos[]) => void
}

export function EquiposList({
  equiposColumns,
  equipos,
  isLoading,
  pageKey,
  handlePageNextChange,
  hasNextPage,
  isFetchingNextPage,
  isNewlyAdded,
  isSmall = false,
  Selected,
  onSelect,
}: Props) {

  const { table } = useTable<Equipos>({
    data: equipos,
    columns: equiposColumns,
    pageKey,
    defaultSelectedRowIds: Selected?.reduce((acc, equipo) => {
      acc[equipo.id] = true
      return acc
    }, {} as Record<string, boolean>),
  })

  const [openModal, setOpenModal] = useState(false)
  const [equipo, setEquipo] = useState<Equipos | null>(null)
  const handleClick = (equipo: Equipos) => {
    setOpenModal(true)
    setEquipo(equipo)
  } 

  return (
    <div className={cn(
      "space-y-4 w-full",
      isSmall && "text-sm"
    )}>
      <DataTable
        columns={equiposColumns}
        table={table}
        isLoading={isLoading}
        onRowClick={handleClick}
        dense={isSmall}
        getRowClassName={(row) => 
          cn(
            "cursor-pointer hover:bg-muted/50 transition-colors",
            isNewlyAdded?.(row.original) && "border-l-4 border-green-500/50 bg-green-50/50",
            isSmall && "text-xs"
          )
        }
      />
      <div className={cn(
        "flex items-center justify-center font-medium my-6",
        isSmall ? "text-xs" : "text-sm"
      )}>
        Resultados: {table.getFilteredRowModel().rows.length}
      </div>
      {
        hasNextPage && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              type="button"
              className={cn(
                "text-black w-full md:w-1/3",
                isSmall && "text-xs py-1"
              )}
              onClick={handlePageNextChange}
              disabled={isFetchingNextPage}
            >
              {
                isFetchingNextPage ? 'Loading...' : 'Load More'
              }
            </Button>
          </div>
        )
      }
      {
        equipo && (
          <BaseModal open={openModal} onClose={() => setOpenModal(false)} title="Detalles del equipo">
            <EquipoDetails equipo={equipo} />
          </BaseModal>
        )
      }
    </div>
  )
}
