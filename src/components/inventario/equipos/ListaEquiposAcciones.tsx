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
import { Equipos } from "@/services/api/inventario-computo/models/Equipos";
import EquipoForm from "@/components/inventario/equipos/EquipoForm"; 
import { useCreateEditEquipos } from "@/hooks/inventario/equipos/useCreateEditEquipos";
import EquipoDetails from "./EquipoDetails";
export default function ListaEquiposAcciones({ equipo }: { equipo: Equipos }) {
 

  const { onDelete, openModal, setOpenModal, openModalDelete, setOpenModalDelete, openModalDetails, setOpenModalDetails } = useCreateEditEquipos();

  const handleOpenModal = () => {
    setOpenModal(true);
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
          <DropdownMenuItem onClick={handleOpenModal}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModalDelete(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModalDetails(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Ver Detalles
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BaseModal open={openModal} onClose={() => setOpenModal(false)} title={`Editar equipo ${equipo.descripcion}`}>
        <EquipoForm onSuccess={() => setOpenModal(false)} initialValues={equipo} />
      </BaseModal>
      
      <BaseModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} title={`Eliminar equipo ${equipo.descripcion}`}
       description={`¿Estás seguro de querer eliminar el equipo con el número de serie ${equipo.numSerie}? Esta acción es irreversible.`} footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpenModalDelete(false)}>Cancelar</Button>
          <Button onClick={() => onDelete.mutate(equipo.id)}>Eliminar</Button>
        </div>
      }>
      </BaseModal>
      <BaseModal open={openModalDetails} onClose={() => setOpenModalDetails(false)} title={`Detalles del equipo ${equipo.descripcion}`}>
        <EquipoDetails equipo={equipo} />
      </BaseModal>
    </>
  );
}
