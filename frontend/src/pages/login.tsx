import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginFormSchema, type LoginFormType } from "../utils/schemas/users-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "../lib/axios";
import Cookies from "js-cookie";
import { Message, useToaster } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage = () => {
  const toaster = useToaster()
  const navigate = useNavigate()

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
      }).then((res) => {
        Cookies.set("auth-token", res.data.token, {
          expires: 1,
        })
        toaster.push(<Message type="success">{res.data.message ?? "Login efetuado com sucesso!"}</Message>)
        navigate("/users")
      })
      .catch((err: AxiosError<{error?: string}>) => {
        console.log(err);
        
        toaster.push(<Message type="error">{err.response?.data.error ?? "Erro na autenticação!"}</Message>)
      });
  };

  useEffect(() => {
    document.title = "Login";
    const token = Cookies.get("auth-token")
    if (token) {
      navigate("/users")
    }
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:w-72">
        <h1 className="text-3xl font-semibold mb-4">Entrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div>
              <input
                placeholder="Nome de usuário"
                {...register("username")}
                className={`w-full outline-none border px-4 py-2 rounded-md placeholder:font-medium ${errors.username
                  ? "border-red-400 bg-red-600/5"
                  : "border-white bg-transparent focus:border-blue-400 focus:bg-blue-600/5 "
                  } focus:scale-[1.015] transition-all`}
                autoComplete="off"
              />

              {errors.username && (
                <span className="block w-full text-right text-red-600 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <input
                placeholder="Senha"
                type="password"
                {...register("password")}
                className={`w-full outline-none border px-4 py-2 rounded-md placeholder:font-medium ${errors.password
                  ? "border-red-400 bg-red-600/5"
                  : "border-white bg-transparent focus:border-blue-400 focus:bg-blue-600/5 "
                  } focus:scale-[1.015] transition-all`}
                autoComplete="off"
              />

              {errors.password && (
                <span className="block w-full text-right text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
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
