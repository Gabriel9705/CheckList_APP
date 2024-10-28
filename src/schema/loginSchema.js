import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
    password: z.string().min(4, { message: "Senha deve ter no minimo 4 caracteres." })
});
