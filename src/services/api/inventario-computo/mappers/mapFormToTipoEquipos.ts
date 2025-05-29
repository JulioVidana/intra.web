
import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
import { TipoEquipoPost, TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos";

export function mapFormToTipoEquipos(data: TipoEquipoFormData): TipoEquipoPost {
   return {
    id: data.id ? parseInt(data.id, 10) : 0,
    nombre: data.nombre,
    clave: data.clave,
    createdBy: "1",
    created: new Date().toISOString(),
    modifiedBy: "1",
    modified: new Date().toISOString(),
  };


}
