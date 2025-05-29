
import { z } from "zod";

export const tipoEquipoSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, { message: "Nombre requerido" }).max(50, { message: "Nombre no puede tener más de 50 caracteres" }),
  clave: z.string().min(1, { message: "Clave requerida" }).max(50, { message: "Clave no puede tener más de 50 caracteres" }),
});

export type TipoEquipoFormData = z.infer<typeof tipoEquipoSchema>;
