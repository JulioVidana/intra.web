import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus";
import BaseModal from "@/components/common/base-modal";
import TipoEstatusForm from "./TipoEstatusForm";
import { useCreateEditTipoEstatus } from "@/hooks/inventario/catStatus/useCreateEditTipoEstatus";
export default function TipoEstatusAcciones({tipoEstatus}:{tipoEstatus:TipoEstatus}) {

  const {openModal, setOpenModal, openModalDelete, setOpenModalDelete, onDelete} = useCreateEditTipoEstatus()
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
      <DropdownMenuItem onClick={()=>setOpenModal(true)}>
        <Pencil className="mr-2 h-4 w-4" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem onClick={()=>setOpenModalDelete(true)}>
        <Trash2 className="mr-2 h-4 w-4" />
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>   
  <BaseModal open={openModal} onClose={() => setOpenModal(false)} title={`Editar tipo de equipo ${tipoEstatus.nombre}`}>
    <TipoEstatusForm onSuccess={() => setOpenModal(false)} initialValues={tipoEstatus} />
  </BaseModal>
  <BaseModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} title={`Eliminar tipo de equipo ${tipoEstatus.nombre}`}
  description={`¿Estás seguro de querer eliminar el tipo de equipo ${tipoEstatus.nombre}? Esta acción es irreversible.`} footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setOpenModalDelete(false)}>Cancelar</Button>
      <Button onClick={() => onDelete.mutate(tipoEstatus.id)}>Eliminar</Button>
    </div>}
    >
    </BaseModal>  
  </>
  )
}
