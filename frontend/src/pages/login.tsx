import { useForm, type SubmitHandler } from "react-hook-form";
import {
  LoginFormSchema,
  type LoginFormType,
} from "../utils/schemas/users-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { api } from "../lib/axios";
import Cookies from "js-cookie";
import { Message, useToaster } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MyInput } from "../components/input";

export const LoginPage = () => {
  const toaster = useToaster();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const { username, password } = data;
    console.log(username.length);
    

    api
      .post("/validate", {
        username,
        password,
      })
      .then((res) => {
        Cookies.set("auth-token", res.data.token, {
          expires: 1,
        });
        toaster.push(
          <Message type="success">
            {res.data.message ?? "Login efetuado com sucesso!"}
          </Message>
        );
        navigate("/users");
      })
      .catch((err: AxiosError<{ error?: string }>) => {
        console.log(err);

        toaster.push(
          <Message type="error">
            {err.response?.data.error ?? "Erro na autenticação!"}
          </Message>
        );
      });
  };

  useEffect(() => {
    document.title = "Login";
    const token = Cookies.get("auth-token");
    if (token) {
      navigate("/users");
    }
  }, [navigate]);

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
            <span className="text-center font-medium text-sm">
              {" "}
              Ou tente{" "}
              <a href="" className="text-blue-600 underline">
                criar uma conta
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
