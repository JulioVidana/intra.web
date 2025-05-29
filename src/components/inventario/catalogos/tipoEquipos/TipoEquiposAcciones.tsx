import BaseModal from "@/components/common/base-modal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import TipoEquipoForm from "./TipoEquipoForm";
import { useCreateEditTipoEquipos } from "@/hooks/inventario/catInventario/useCreateEditTipoEquipos";
export default function TipoEquiposAcciones({tipoEquipo}:{tipoEquipo:TipoEquipos}) {
    const {openModal, setOpenModal, openModalDelete, setOpenModalDelete, onDelete} = useCreateEditTipoEquipos()
  return (
    <>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Abrir menú</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(tipoEquipo.nombre)}>
        Copiar Nombre
      </DropdownMenuItem>
      <DropdownMenuSeparator />
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
    <BaseModal open={openModal} onClose={() => setOpenModal(false)} title={`Editar tipo de equipo ${tipoEquipo.nombre}`}>
    <TipoEquipoForm onSuccess={() => setOpenModal(false)} initialValues={tipoEquipo} />
  </BaseModal>
  <BaseModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} title={`Eliminar tipo de equipo ${tipoEquipo.nombre}`}
  description={`¿Estás seguro de querer eliminar el tipo de equipo ${tipoEquipo.nombre}? Esta acción es irreversible.`} footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setOpenModalDelete(false)}>Cancelar</Button>
      <Button onClick={() => onDelete.mutate(tipoEquipo.id)}>Eliminar</Button>
    </div>}
    >
    </BaseModal>
  </>
  )
}
