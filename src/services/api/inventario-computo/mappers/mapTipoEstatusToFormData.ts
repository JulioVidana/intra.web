import { TipoEstatusFormData } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusSchema";
import { TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus";

export function mapTipoEstatusToFormData(tipoEstatus: TipoEstatus): TipoEstatusFormData {
  return {
    id: tipoEstatus.id ? String(tipoEstatus.id) : undefined,
    nombre: tipoEstatus.nombre,
  };
}
