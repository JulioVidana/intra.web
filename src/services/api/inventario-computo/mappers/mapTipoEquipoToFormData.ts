import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
import { TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos";

export function mapTipoEquipoToFormData(tipoEquipo: TipoEquipos): TipoEquipoFormData {
  return {
    id: tipoEquipo.id ? String(tipoEquipo.id) : undefined,
    nombre: tipoEquipo.nombre,
    clave: tipoEquipo.clave,
  };
}
