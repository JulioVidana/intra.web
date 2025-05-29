import BaseModal from "@/components/common/base-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { Asignaciones } from "@/services/api/inventario-computo/models/Asignaciones";
import { useRouter } from "next/navigation";
import { PATH_PAGE } from "@/routes/paths";

export default function ListaAsignacionesAcciones({ asignacion }: { asignacion: Asignaciones }) {
  const router = useRouter();


  const handleOpenModal = () => {
    
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={()=>router.push(`${PATH_PAGE.inventarioComputo.listadoAsignaciones}/${asignacion.idEmpleado}`)} >
            <Eye className="mr-2 h-4 w-4" />
            Ver Detalles
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
