
import { TipoEstatusFormData } from "./tipoEstatusSchema";
    
export const getTipoEstatusDefaultValues = (
  overrides?: Partial<TipoEstatusFormData>
): TipoEstatusFormData => ({
  id: "",
  nombre: "",
  ...overrides,
});
