import { Equipos } from "@/services/api/inventario-computo/models/Equipos";
import { EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";

export function mapEquipoToFormData(equipo: Equipos): EquipoFormData {
  return {
    id: equipo.id ? String(equipo.id) : undefined,
    statusId: String(equipo.statusId),
    tiposEquiposId: String(equipo.tiposEquiposId),
    subEquiposId: equipo.subEquiposId ? String(equipo.subEquiposId) : undefined,
    claveSIIF: equipo.claveSIIF ?? "",
    descripcion: equipo.descripcion ?? "",
    clave: equipo.clave ?? "",
    numSerie: equipo.numSerie ?? "",
    observaciones: equipo.observaciones ?? "",
    caracteristicas: equipo.caracteristicas ?? "",
    ubicacion: equipo.ubicacion ?? "",
    fechaBaja: equipo.fechaBaja ? new Date(equipo.fechaBaja) : undefined,
  };
}
