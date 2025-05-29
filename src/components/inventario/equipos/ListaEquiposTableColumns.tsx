import { Button } from "@/components/ui/button"
import { TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import ListaEquiposAcciones from "./ListaEquiposAcciones"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { Badge } from "@/components/ui/badge"
export const EquiposColumns: ColumnDef<Equipos>[] = [
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
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => <div className="capitalize">{row.getValue("descripcion")}</div>,
  },
  {
    accessorKey: "caracteristicas",
    header: "Características",
    cell: ({ row }) => <div className="capitalize overflow-hidden text-ellipsis max-w-[400px]">{row.getValue("caracteristicas")}</div>,
  },
  {
    accessorKey: "clave",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Clave
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="uppercase font-medium">{row.getValue("clave")}</div>,
  },
  {
    accessorKey: "statusNombre",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("statusNombre");
      const statusColor = status === "Activo" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100";
      return (
        <Badge className={`capitalize ${statusColor}`}>{status?.toString()}</Badge>
      );
    },
  },
  {
    accessorKey: "isAsignado",
    header: "Asignado",
    cell: ({ row }) => {
      const isAsignado = row.getValue("isAsignado");
      const isAsignadoColor = isAsignado ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : "bg-grey-100 text-grey-800 hover:bg-grey-100";
      return <Badge className={`capitalize ${isAsignadoColor}`}>{isAsignado ? "Si" : "No"}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const equipo = row.original;

      return (
            <ListaEquiposAcciones equipo={equipo} />
      );
    },
  },
];