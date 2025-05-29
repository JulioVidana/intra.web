
import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
    
export const getTipoEquipoDefaultValues = (
  overrides?: Partial<TipoEquipoFormData>
): TipoEquipoFormData => ({
  id: "",
  nombre: "",
  clave: "",
  ...overrides,
});
