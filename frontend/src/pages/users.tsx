import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CreateUserModal } from "../components/user/createUserModal";
import { DeleteUserModal } from "../components/user/deleteUserModal";
import type { AxiosError, AxiosResponse } from "axios";
import type { SubmitHandler } from "react-hook-form";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell, Table } from "rsuite-table";
import { IconButton } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { SideBar } from "../components/sideBar";
import type {
  CreateUserFormType,
  UpdateUserFormType,
  UserDataType,
} from "../utils/schemas/users-schemas";
import { UpdateUserModal } from "../components/user/updateUserModal";

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

  useEffect(getData, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="overflow-x-auto m-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Usuários</h1>

          <Button colorScheme="blue" onClick={createUserDisclosure.onOpen}>
            Adicionar
          </Button>
        </div>

        <Table autoHeight data={users}>
          <Column width={300} resizable fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={150}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="username" />
          </Column>

          <Column width={150}>
            <HeaderCell>Senha</HeaderCell>
            <Cell dataKey="password" />
          </Column>

          <Column width={100} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ paddingInline: "auto", paddingBlock: "5px" }}>
              {(rowData: UserDataType) => (
                <div className="flex gap-2">
                  <IconButton
                    icon={<EditIcon />}
                    className="bg-transparent focus:bg-transparent hover:bg-blue-500/25 text-blue-500 hover:text-blue-400 focus:text-blue-500"
                    onClick={() => {
                      setUserSelected(rowData);
                      updateUserDisclosure.onOpen();
                    }}
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    className="bg-transparent focus:bg-transparent hover:bg-red-500/25 text-red-500 hover:text-red-400 focus:text-red-500"
                    onClick={() => {
                      setUserSelected(rowData);
                      deleteUserDisclosure.onOpen();
                    }}
                  />
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      <CreateUserModal
        createHandler={createHandler}
        createUserDisclosure={createUserDisclosure}
      />
      <UpdateUserModal
        updateHandler={updateHandler}
        updateUserDisclosure={updateUserDisclosure}
        userSelected={userSelected}
      />
      <DeleteUserModal
        deleteHandler={deleteHandler}
        deleteUserDisclosure={deleteUserDisclosure}
      />
    </div>
  );
};
