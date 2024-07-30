import { z } from "zod"

export const FormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
})

export type FormType = z.infer<typeof FormSchema>