
import { TipoEstatusFormData } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusSchema";
import { TipoEstatusPost, TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus";

export function mapFormToTipoEstatus(data: TipoEstatusFormData): TipoEstatusPost {
   return {
    id: data.id ? parseInt(data.id, 10) : 0,
    nombre: data.nombre,
    createdBy: "1",
    created: new Date().toISOString(),
    modifiedBy: "1",
    modified: new Date().toISOString(),
  };


}
