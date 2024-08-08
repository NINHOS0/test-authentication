import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CreateUserModal } from "../components/modals/createUserModal";
import { DeleteUserModal } from "../components/modals/deleteUserModal";
import { UpdateUserModal } from "../components/modals/updateUserModal";
import type { AxiosError, AxiosResponse } from "axios";
import type { SubmitHandler } from "react-hook-form";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell, Table } from "rsuite-table";
import { Button, IconButton, Message, SelectPicker, useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { SideBar } from "../components/sideBar";
import {
  UserFiltersSchema,
  type CreateUserFormType,
  type UpdateUserFormType,
  type UserDataType,
  type UserFilters,
} from "../utils/schemas/users-schemas";
import { MyInput } from "../components/input";
import { useAuth } from "../contexts/useAuth";
import { useDisclosure } from "../hooks/useDisclosure";
import { ItemDataType } from "rsuite/esm/MultiCascadeTree";

export const UsersPage = () => {
  const createUserDisclosure = useDisclosure();
  const deleteUserDisclosure = useDisclosure();
  const updateUserDisclosure = useDisclosure();
  const toaster = useToaster();
  const { authToken, hasToken } = useAuth()

  const [users, setUsers] = useState<UserDataType[]>([]);

  const [userSelected, setUserSelected] = useState<UserDataType | undefined>(
    undefined
  );

  const createHandler: SubmitHandler<CreateUserFormType> = (data) => {
    createUserDisclosure.onClose();

    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    api
      .post("/users", data, {
        headers: {
          "Authorization": authToken
        }
      })
      .then((res: AxiosResponse<{ message: string; user: UserDataType }>) => {
        toaster.push(<Message type="success">Usuário criado com sucesso!</Message>)
        setUsers([...users, res.data.user]);
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(<Message type="error">{err.response?.data.message ?? "Erro ao criar usuário!"}</Message>)
      });
  };

  const updateHandler = (data: UpdateUserFormType) => {
    updateUserDisclosure.onClose();
    if (userSelected === undefined) {
      return;
    }
    
    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    api
      .patch(`/users/${userSelected.id}`, data, {
        headers: {
          "Authorization": authToken
        }
      })
      .then((res: AxiosResponse<{ message: string; user: UserDataType }>) => {
        toaster.push(<Message type="success">Usuário modificado com sucesso!</Message>)
        setUsers(
          users.map((user) =>
            user.id === userSelected.id ? res.data.user : user
          )
        );
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(<Message type="error">{err.response?.data.message ?? "Erro ao modificar usuário!"}</Message>)
      });
  };

  function deleteHandler() {
    deleteUserDisclosure.onClose();

    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    if (userSelected === undefined) {
      return;
    }
    api
      .delete(`/users/${userSelected.id}`, {
        headers: {
          "Authorization": authToken
        }
      })
      .then(() => {
        toaster.push(<Message type="success">Usuário removido com sucesso!</Message>)
        setUsers(users.filter((user) => user.id !== userSelected.id));
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(<Message type="error">{err.response?.data.message ?? "Erro ao remover usuário!"}</Message>)
      });
  }

  function getData() {
    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }
    
    api.get("/users", {
      headers: {
        "Authorization": authToken
      }
    }).then((res) => {
      setUsers(res.data.users);
    });
  }

  useEffect(getData, []);

  const getFilters: ItemDataType<string>[] = Object.keys(UserFiltersSchema.shape).map(
    item => {
      return {value: item.toString(), label: item.toString()}
    }
  );

  const [filterSelected, setFilterSelected] = useState<UserFilters | null>(null)
  const [filteredData, setFilteredData] = useState<UserDataType[] | null>()

  function getFilterData(filterData: string) {
    if (filterData.length === 0) {
      setFilteredData(null)
    }
    if (filterSelected === null) {
      return
    }
    setFilteredData(users.filter((user) => user[filterSelected].toString().toLowerCase().includes(filterData.toLowerCase())))
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="overflow-x-auto m-8 flex-1">
        <div className="flex items-end justify-between mb-6">
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-3xl font-semibold">Usuários</h1>
            <div className="flex gap-4">
              <SelectPicker
                data={getFilters}
                searchable={false}
                label="Filtrar"
                className="w-36"
                menuClassName="hover:text-white"
                onChange={(value: UserFilters | null) => setFilterSelected(value)}
              />
              {filterSelected && (
                <div className="max-w-64">
                  <MyInput placeholder="Filtro" onChange={(data: any) => getFilterData(data.target.value)} />
                </div>
              )}

            </div>
          </div>

          <Button
            onClick={createUserDisclosure.onOpen}
            appearance="primary"
            size="lg"
          >
            Adicionar
          </Button>
        </div>

        <Table autoHeight data={filteredData ?? users}>
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

          <Column fixed="right" align="right" minWidth={100} flexGrow={1}>
            <HeaderCell>Editar</HeaderCell>

            <Cell style={{ paddingInline: "auto", paddingBlock: "5px"}} className="!w-full">
              {(rowData: UserDataType) => (
                <div className="flex gap-2">
                  <IconButton
                    icon={<EditIcon />}
                    className="!bg-transparent focus:!bg-transparent hover:!bg-blue-500/25 !text-blue-500 hover:!text-blue-400 focus:!text-blue-500"
                    onClick={() => {
                      setUserSelected(rowData);
                      updateUserDisclosure.onOpen();
                    }}
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    className="!bg-transparent focus:!bg-transparent hover:!bg-red-500/25 !text-red-500 hover:!text-red-400 focus:!text-red-500"
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
