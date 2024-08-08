import { z } from "zod";

const BaseClientSchema = z.object({
  cnpj: z.string().min(10).max(14),
  name: z.string().min(1, {message: "Required"}),
  fantasy: z.string(),
  address: z.string().min(1, {message: "Required"}),
  number: z.coerce.number(),
  complement: z.string(),
  cep: z.coerce.number().min(1, {message: "Required"}),
  district: z.string().min(1, {message: "Required"}),
  city: z.string().min(1, {message: "Required"}),
  state: z.string().min(2, {message: "Invalid"}).max(2, {message: "Invalid"}),
  email: z.string().email(),
  phone: z.coerce.string().min(1, {message: "Required"}),
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
