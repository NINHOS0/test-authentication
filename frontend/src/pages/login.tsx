import { useForm, type SubmitHandler } from "react-hook-form";
import { FormSchema, FormType } from "../utils/schemas/user/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/toast";
import { api } from "../lib/axios";

export const LoginPage = () => {
  const toast = useToast({
    title: "Autenticação",
    duration: 5000,
    isClosable: false,
    position: "bottom-right",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const { username, password } = data;

    const response: AxiosResponse = await api
      .post("/validate", {
        username,
        password,
      })
      .catch((err) => {
        return err.response;
      });

    if (!response) {
      toast({
        description: "Erro ao conectar-se ao servidor!",
        status: "error",
      });
    }

    if (response.data.error) {
      toast({
        description: response.data.error,
        status: "error",
      });
      return;
    }

    if (response.status !== 200) {
      toast({
        description: "Erro na autenticação",
        status: "error",
      });
      return;
    }

    if (response.data.message) {
      toast({
        description: response.data.message,
        status: "success",
      });
    }
  };

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
