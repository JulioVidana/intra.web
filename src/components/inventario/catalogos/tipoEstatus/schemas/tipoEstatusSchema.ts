
import { z } from "zod";

export const tipoEstatusSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, { message: "Nombre requerido" }).max(50, { message: "Nombre no puede tener más de 50 caracteres" }),
});

export type TipoEstatusFormData = z.infer<typeof tipoEstatusSchema>;
