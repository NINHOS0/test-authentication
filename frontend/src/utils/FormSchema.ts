import { z } from "zod"

export const FormSchema = z.object({
  username: z.string().min(3, {message: "Usuário muito curto"}),
  password: z.string().trim()
})

export type IFormSchema = z.infer<typeof FormSchema>