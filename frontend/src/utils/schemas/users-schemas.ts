import { z } from "zod";

const BaseUserSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

const LoginFormSchema = BaseUserSchema
const CreateUserFormSchema = BaseUserSchema
const UpdateUserFormSchema = BaseUserSchema

type UserDataType = {
  id: string;
  username: string;
  password: string;
};

type LoginFormType = z.infer<typeof LoginFormSchema>;
type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;
type UpdateUserFormType = z.infer<typeof UpdateUserFormSchema>;

export { LoginFormSchema, CreateUserFormSchema, UpdateUserFormSchema };
export type { LoginFormType, CreateUserFormType, UpdateUserFormType, UserDataType };
