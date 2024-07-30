import {
  Button, Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { CreateUserModal } from "../components/createUserModal";
import { DeleteUserModal } from "../components/deleteUserModal";
import type { AxiosError, AxiosResponse } from "axios";
import type { SubmitHandler } from "react-hook-form";
import type { CreateUserFormType } from "../utils/schemas/CreateUserSchema";
import type { UpdateUserFormType } from "../utils/schemas/UpdateUserSchema";
import { UpdateUserModal } from "../components/updateUserModal";
import type { UserDataType } from "../utils/schemas/UserData";

export const UsersPage = () => {
  const createUserDisclosure = useDisclosure();
  const deleteUserDisclosure = useDisclosure();
  const updateUserDisclosure = useDisclosure();
  const [users, setUsers] = useState<UserDataType[]>([]);

  const [userSelected, setUserSelected] = useState<UserDataType | undefined>(
    undefined
  );

  const toast = useToast({
    duration: 5000,
    isClosable: false,
    position: "bottom-right",
  });

  const createHandler: SubmitHandler<CreateUserFormType> = (data) => {
    createUserDisclosure.onClose();
    api
      .post("/users", data)
      .then((res: AxiosResponse<{ message: string; data: UserDataType }>) => {
        toast({
          title: "Criando usuário",
          description: res.data.message ?? "",
          status: "success",
        });
        setUsers([...users, res.data.data]);
      })
      .catch((err: AxiosError<{ error?: string }>) => {
        toast({
          title: "Criando usuário",
          description: err.response?.data.error ?? "Erro ao criar usuário",
          status: "error",
        });
      });
  };

  const updateHandler = (data: UpdateUserFormType) => {
    if (userSelected === undefined) {
      return;
    }
    updateUserDisclosure.onClose();
    api
      .patch(`/users/${userSelected.id}`, data)
      .then((res: AxiosResponse<{ message: string; data: UserDataType }>) => {
        toast({
          title: "Modificando usuário",
          description: res.data.message ?? "",
          status: "success",
        });
        setUsers(
          users.map((user) =>
            user.id === userSelected.id ? res.data.data : user
          )
        );
      })
      .catch((err: AxiosError<{ error?: string }>) => {
        toast({
          title: "Modificando usuário",
          description: err.response?.data.error ?? "Erro ao modificar usuário",
          status: "error",
        });
      });
  };

  function deleteHandler() {
    if (userSelected === undefined) {
      return;
    }
    api
      .delete(`/users/${userSelected.id}`)
      .then((res) => {
        toast({
          title: "Deletando usuário",
          description: res.data.message ?? "",
          status: "success",
        });
        setUsers(users.filter((user) => user.id !== userSelected.id));
      })
      .catch((err: AxiosError<{ error?: string }>) => {
        toast({
          title: "Deletando usuário",
          description: err.response?.data.error ?? "Erro ao deletar o usuário!",
          status: "error",
        });
      });
    deleteUserDisclosure.onClose();
  }

  function getData() {
    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }

  useEffect(() => {
    document.title = "Gerenciar usuários";
  }, []);

  useEffect(getData, [users]);

  return (
    <div className="h-screen bg-zinc-950 text-white flex justify-center pt-32">
      <div className="sm:w-[1024px] w-4 overflow-x-auto mx-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Tabela Usuários</h1>

          <Button colorScheme="blue" onClick={createUserDisclosure.onOpen}>
            Adicionar
          </Button>
        </div>

        <table className="grid grid-cols-1 text-left max-w-full">
          <tr className="grid grid-cols-[24em,10em,24em,5em] gap-1 grid-rows-1 bg-zinc-900">
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th className="text-right">Editar</th>
          </tr>
          {users.map((user, index) => (
            <tr
              className={`grid grid-cols-[24em,10em,24em,5em] gap-1 grid-rows-1 ${
                index % 2 == 1 && "bg-zinc-900"
              }`}
              key={user.username}
            >
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td className="text-right">
                <Tooltip label="Editar">
                  <button
                    onClick={() => {
                      setUserSelected(user);
                      updateUserDisclosure.onOpen();
                    }}
                  >
                    <EditIcon />
                  </button>
                </Tooltip>
                <Tooltip label="Deletar">
                  <button
                    className="text-red-600"
                    onClick={() => {
                      setUserSelected(user);
                      deleteUserDisclosure.onOpen();
                    }}
                  >
                    <DeleteForeverIcon />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <CreateUserModal
        createHandler={createHandler}
        createUserDisclosure={createUserDisclosure}
      />
      <DeleteUserModal
        deleteHandler={deleteHandler}
        deleteUserDisclosure={deleteUserDisclosure}
      />
      <UpdateUserModal
        updateHandler={updateHandler}
        updateUserDisclosure={updateUserDisclosure}
        userSelected={userSelected}
      />
    </div>
  );
};
