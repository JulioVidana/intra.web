import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Asignaciones } from "@/services/api/inventario-computo/models/Asignaciones"
import { Badge } from "@/components/ui/badge"
import ListaAsignacionesAcciones from "./ListaAsignacionesAcciones"
import { getStatusStyle } from "@/utils/status"
export const AsignacionesColumns: ColumnDef<Asignaciones>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
    cell: ({ row }) => <div className="capitalize overflow-hidden text-ellipsis max-w-[400px]">{row.getValue("apellido")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="uppercase font-medium">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "totalEquipos",
    header: "Total de Equipos",
    cell: ({ row }) => {
      const totalEquipos = row.getValue("totalEquipos");
      const statusColor = getStatusStyle('activo');
      return (
          <Badge className={`capitalize ${statusColor}`}>{totalEquipos?.toString()}</Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const asignacion = row.original;

      return (
            <ListaAsignacionesAcciones asignacion={asignacion} />
      );
    },
  },
];