import { z } from "zod";

export const CreateClientFormSchema = z.object({
  cnpj: z.string().min(10).max(14),
  name: z.string(),
  fantasy: z.string(),
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  cep: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string().min(2).max(2),
  email: z.string().email(),
  phone: z.string(),
});

export type CreateClientFormType = z.infer<typeof CreateClientFormSchema>;