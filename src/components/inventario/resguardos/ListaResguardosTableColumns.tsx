import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import ListaResguardosAcciones from "./ListaResguardosAcciones"
import { Resguardo } from "@/services/api/inventario-computo/models/Resguardos"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
export const ResguardosColumns: ColumnDef<Resguardo>[] = [
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
    accessorKey: "empleado",
    header: "Empleado",
    cell: ({ row }) => <div className="capitalize">{row.getValue("empleado")}</div>,
  },
  {
    accessorKey: "notas",
    header: "Notas",
    cell: ({ row }) => <div className="capitalize overflow-hidden text-ellipsis max-w-[400px]">{row.getValue("notas")}</div>,
  },
  {
    accessorKey: "estatus",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Estatus
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <Badge className={`font-medium ${row.getValue("estatus") === "Pendiente" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : row.getValue("estatus") === "Completado" ? "bg-green-100 text-green-800 hover:bg-green-100" : row.getValue("estatus") === "Desactualizado" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100"}`}>{row.getValue("estatus") === "Desactualizado" ?  <AlertTriangle className="h-3.5 w-3.5 mr-1" /> : ''}{row.getValue("estatus")}</Badge>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const resguardo = row.original;

      return (
            <ListaResguardosAcciones resguardo={resguardo} />
      );
    },
  },
];