import { z } from "zod";

export const UpdateUserFormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
});

export type UpdateUserFormType = z.infer<typeof UpdateUserFormSchema>;