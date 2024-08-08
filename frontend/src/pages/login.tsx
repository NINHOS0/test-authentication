import { useForm, type SubmitHandler } from "react-hook-form";
import {
  LoginFormSchema,
  type LoginFormType,
} from "../utils/schemas/users-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { api } from "../lib/axios";
import { Message, useToaster } from "rsuite";
import { MyInput } from "../components/input";
import { useAuth } from "../contexts/useAuth";

export const LoginPage = () => {
  const toaster = useToaster();
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const { username, password } = data;

    api
      .post("/validate", {
        username,
        password,
      })
      .then((res) => {
        if (!res.data.token) {
          throw new Error("500: Token não retornado")
        }

        login(res.data.token)
        toaster.push(
          <Message type="success">
            {res.data.message ?? "Login efetuado com sucesso!"}
          </Message>
        );
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(
          <Message type="error">
            {err.response?.data.message ?? "Erro na autenticação!"}
          </Message>
        );
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:w-72">
        <h1 className="text-3xl font-semibold mb-4">Entrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <MyInput
              label="Usuário"
              id="username"
              {...register("username")}
              error={errors.username && errors.username.message}
            />
            <MyInput
              label="Senha"
              type="password"
              id="password"
              {...register("password")}
              error={errors.password && errors.password.message}
            />
            <button
              type="submit"
              className="mt-2 py-2 bg-blue-600 rounded-md font-medium"
            >
              Entrar
            </button>
            {/* <span className="text-center font-medium text-sm">
              {" "}
              Ou tente{" "}
              <a href="" className="text-blue-600 underline">
                criar uma conta
              </a>
            </span> */}
          </div>
        </form>
      </div>
    </div>
  );
};
