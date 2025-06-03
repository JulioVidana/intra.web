
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(1, { message: "Correo electrónico requerido" }),
  password: z.string().min(1, { message: "Contraseña requerida" }),
});

export type AuthFormData = z.infer<typeof authSchema>;
