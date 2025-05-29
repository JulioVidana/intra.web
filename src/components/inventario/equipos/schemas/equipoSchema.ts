
import { z } from "zod";

export const equipoSchema = z.object({
  id: z.string().optional(),
  statusId: z.string().min(1, { message: "Status requerido" }).max(50, { message: "tatus no puede tener más de 50 caracteres" }),
  tiposEquiposId: z.string().min(1, { message: "Tipo de equipo requerido" }).max(50, { message: "Tipo de equipo no puede tener más de 50 caracteres" }),
  subEquiposId: z.string().optional(),
  claveSIIF: z.string().min(1, { message: "Clave SIIF requerida" }).max(50, { message: "Clave SIIF no puede tener más de 50 caracteres" }),
  descripcion: z.string().min(1, { message: "Descripción requerida" }).max(255, { message: "Descripción no puede tener más de 255 caracteres" }),
  clave: z.string().min(1, { message: "Clave requerida" }).max(50, { message: "Clave no puede tener más de 50 caracteres" }),
  numSerie: z.string().min(1, { message: "Número de serie requerido" }).max(50, { message: "Número de serie no puede tener más de 50 caracteres" }),
  observaciones: z.string().optional(),
  caracteristicas: z.string().min(1, { message: "Características requeridas" }).max(255, { message: "Características no puede tener más de 255 caracteres" }),
  ubicacion: z.string().min(1, { message: "Ubicación requerida" }).max(255, { message: "Ubicación no puede tener más de 255 caracteres" }),
  fechaBaja: z.date().optional(),
});

export type EquipoFormData = z.infer<typeof equipoSchema>;
