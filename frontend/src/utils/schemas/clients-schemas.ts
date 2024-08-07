import { z } from "zod";

const BaseClientSchema = z.object({
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

const CreateClientFormSchema = BaseClientSchema;
const UpdateClientFormSchema = BaseClientSchema.omit({ cnpj: true });
const ClientDataSchema = BaseClientSchema.extend({ id: z.string().uuid() });

type CreateClientFormType = z.infer<typeof CreateClientFormSchema>;
type UpdateClientFormType = z.infer<typeof UpdateClientFormSchema>;
type ClientDataType = z.infer<typeof ClientDataSchema>;
type ClientFilters = "cnpj" | "name" | "fantasy" | "address" | "number" | "complement" | "cep" | "district" | "city" | "state" | "email" | "phone"

export { CreateClientFormSchema, UpdateClientFormSchema, ClientDataSchema };
export type { ClientFilters,  CreateClientFormType, UpdateClientFormType, ClientDataType };
