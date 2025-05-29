import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { Badge } from "@/components/ui/badge"

export const getEquiposColumns = (onSelect?: (equipos: Equipos | Equipos[]) => void): ColumnDef<Equipos>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
          if (onSelect) {
            const equiposSeleccionados = table.getRowModel().rows
              .filter(row => !!value)
              .map(row => row.original)
            onSelect(equiposSeleccionados)
          }
        }}
        aria-label="Select all"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          if (onSelect) {
            const equipo = row.original
            onSelect(equipo)
          }
        }}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("descripcion")}</div>
    ),
  },
  {
    accessorKey: "caracteristicas",
    header: "Características",
    cell: ({ row }) => (
      <div className="capitalize overflow-hidden text-ellipsis max-w-[400px]">
        {row.getValue("caracteristicas")}
      </div>
    ),
  },
  {
    accessorKey: "clave",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Clave
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase font-medium">{row.getValue("clave")}</div>
    ),
  },
  {
    accessorKey: "statusNombre",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("statusNombre");
      const statusColor = status === "Activo"
        ? "bg-green-100 text-green-800 hover:bg-green-100"
        : "bg-red-100 text-red-800 hover:bg-red-100";
      return (
        <Badge className={`capitalize ${statusColor}`}>
          {status?.toString()}
        </Badge>
      );
    },
  },
];
