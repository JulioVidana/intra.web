
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus"
import TipoEstatusAcciones from "./TipoEstatusAcciones"

export const TipoEstatusTableColumns: ColumnDef<TipoEstatus>[] = [
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const tipoEquipo = row.original;
  
        return (
          <TipoEstatusAcciones tipoEquipo={tipoEquipo} />
        );
      },
    },
  ];