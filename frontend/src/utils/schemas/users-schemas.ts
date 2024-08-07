import { z } from "zod";

const BaseUserSchema = z.object({
  username: z.string().trim().min(1, {message: "Required"}),
  password: z.string().trim().min(1, {message: "Required"})
});

const LoginFormSchema = BaseUserSchema
const CreateUserFormSchema = BaseUserSchema
const UpdateUserFormSchema = BaseUserSchema
const UserDataSchema = BaseUserSchema.extend({id: z.string()})
const UserFiltersSchema = BaseUserSchema.omit({password: true}).extend({id: z.string().uuid()})


type LoginFormType = z.infer<typeof LoginFormSchema>;
type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;
type UpdateUserFormType = z.infer<typeof UpdateUserFormSchema>;
type UserDataType = z.infer<typeof UserDataSchema>
type UserFilters = "id" | "username"

export { UserFiltersSchema, UserDataSchema, LoginFormSchema, CreateUserFormSchema, UpdateUserFormSchema };
export type { UserFilters, LoginFormType, CreateUserFormType, UpdateUserFormType, UserDataType };
