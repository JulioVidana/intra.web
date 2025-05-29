
import { EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";
import { EquipoPost } from "@/services/api/inventario-computo/models/Equipos";

export function mapFormToEquipos(data: EquipoFormData): EquipoPost {
   return {
    id: data.id ? parseInt(data.id, 10) : undefined,
    statusId: parseInt(data.statusId, 10),
    tiposEquiposId: parseInt(data.tiposEquiposId, 10),
    subEquiposId: data.subEquiposId ? parseInt(data.subEquiposId, 10) : undefined,
    claveSIIF: data.claveSIIF,
    descripcion: data.descripcion,
    clave: data.clave,
    numSerie: data.numSerie,
    caracteristicas: data.caracteristicas,
    ubicacion: data.ubicacion,
    observaciones: data.observaciones,
    fechaBaja: data.fechaBaja,
    createdBy: "1",
    created: new Date().toISOString(),
    modifiedBy: "1",
    modified: new Date().toISOString(),
  };


}
