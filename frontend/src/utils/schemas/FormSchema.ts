import { z } from "zod"

export const FormSchema = z.object({
  username: z.string().trim().min(3, {message: "Usuário muito curto"}),
  password: z.string().trim()
})

export type FormType = z.infer<typeof FormSchema>