
import { EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";

export const getEquipoDefaultValues = (
  overrides?: Partial<EquipoFormData>
): EquipoFormData => ({
  statusId: "",
  tiposEquiposId: "",
  subEquiposId: "",
  claveSIIF: "",
  descripcion: "",
  clave: "",
  numSerie: "",
  caracteristicas: "",
  ubicacion: "",
  observaciones: "",
  fechaBaja: undefined,
  factura: "",
  fechaFactura: undefined,
  valor: undefined,
  ...overrides,
});
