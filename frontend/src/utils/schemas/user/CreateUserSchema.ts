import { z } from "zod";

export const CreateUserFormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
});

export type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;