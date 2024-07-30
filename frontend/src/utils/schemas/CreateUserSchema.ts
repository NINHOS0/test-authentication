import { z } from "zod";

export const CreateUserFormSchema = z.object({
  username: z.string().trim().min(3, {message: "Usuário muito curto"}),
  password: z.string().trim().min(6, {message: "Senha muito curta"})
});

export type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;