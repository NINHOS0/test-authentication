import { z } from "zod";

export const CreateClientFormSchema = z.object({
  cnpj: z.string().min(10).max(14),
  name: z.string(),
  fantasy: z.string(),
  address: z.string(),
  number: z.coerce.number(),
  complement: z.string(),
  cep: z.coerce.number(),
  district: z.string(),
  city: z.string(),
  state: z.string().min(2).max(2),
  email: z.string().email(),
  phone: z.coerce.number(),
});

export type CreateClientFormType = z.infer<typeof CreateClientFormSchema>;