import { SubmitHandler } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CreateClientModal } from "../components/modals/createClientModal";
import { Button, IconButton, Message, SelectPicker, useToaster } from "rsuite";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell, Table } from "rsuite-table";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { SideBar } from "../components/sideBar";
import { useDisclosure } from "../hooks/useDisclosure";
import {
  ClientDataSchema,
  ClientFilters,
  type ClientDataType,
  type CreateClientFormType,
  type UpdateClientFormType,
} from "../utils/schemas/clients-schemas";
import { UpdateClientModal } from "../components/modals/updateClientModal";
import { DeleteClientModal } from "../components/modals/deleteClientModal";
import { MyInput } from "../components/input";
import { useAuth } from "../contexts/useAuth";


export const ClientsPage = () => {
  const createClientDisclosure = useDisclosure();
  const updateClientDisclosure = useDisclosure();
  const deleteClientDisclosure = useDisclosure();
  const toaster = useToaster();
  const { authToken, hasToken } = useAuth()

  const [clients, setClients] = useState<ClientDataType[]>([]);

  const [clientSelected, setClientSelected] = useState<
    ClientDataType | undefined
  >(undefined);

  const createHandler: SubmitHandler<CreateClientFormType> = (data) => {
    createClientDisclosure.onClose();

    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    api
      .post("/clients", data, {
        headers: {
          "Authorization": authToken
        }
      })
      .then((res: AxiosResponse<{ message: string; data: ClientDataType }>) => {
        toaster.push(
          <Message type="success">Cliente criado com sucesso!</Message>
        );
        setClients([...clients, res.data.data]);
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(
          <Message type="error">
            {err.response?.data.message ?? "Erro ao criar cliente!"}
          </Message>
        );
      });
  };

  const updateHandler: SubmitHandler<UpdateClientFormType> = (data) => {
    updateClientDisclosure.onClose()

    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    if (!clientSelected) {
      return;
    }

    api
      .patch(`/clients/${clientSelected.id}`, data, {
        headers: {
          "Authorization": authToken
        }
      })
      .then((res) => {
        toaster.push(
          <Message type="success">{res.data.message ?? ""}</Message>
        );
        setClients(clients.map((client) => client.id === clientSelected?.id ? res.data.data : client));
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toaster.push(
          <Message type="error">
            {err.response?.data.message ?? "Erro ao modificar cliente!"}
          </Message>
        );
      });
  };

  const deleteHandler = () => {
    deleteClientDisclosure.onClose()

    if (!clientSelected) {
      return
    }
    
    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    api.delete(`/clients/${clientSelected.id}`, {
      headers: {
        "Authorization": authToken
      }
    }).then((res) => {
      toaster.push(<Message type="success">{res.data.message ?? ""}</Message>)
      setClients(clients.filter((client) => client.id !== clientSelected.id))
    }).catch((err: AxiosError<{ message?: string }>) => {
      toaster.push(<Message type="error">{err.response?.data.message ?? "Erro ao remover cliente"}</Message>)
    })
  }

  function getData() {
    const isAllowed = hasToken()
    if(!isAllowed) {
      return;
    }

    api.get("/clients", {
      headers: {
        "Authorization": authToken
      }
    }).then((res) => {
      setClients(res.data.clients);
    });
  }

  useEffect(getData, []);

  const getFilters = Object.keys(ClientDataSchema.shape).map(
    item => ({ label: item, value: item })
  );
  const [filterSelected, setFilterSelected] = useState<ClientFilters | null>(null)
  const [filteredData, setFilteredData] = useState<ClientDataType[] | null>()

  function getFilterData(filterData: string) {
    if (filterData.length === 0) {
      setFilteredData(null)
    }
    if (filterSelected === null) {
      return
    }
    setFilteredData(clients.filter((client) => client[filterSelected].toString().toLowerCase().includes(filterData.toLowerCase())))
  }


  return (
    <div className="flex">
      <SideBar />
      <div className="overflow-x-auto m-8 flex-1">
        <div className="flex items-end mb-6">
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-3xl font-semibold">Clientes</h1>
            <div className="flex gap-4">
              <SelectPicker
                data={getFilters}
                searchable={false}
                label="Filtrar"
                className="w-36"
                menuClassName="hover:text-white"
                onChange={(data: ClientFilters | null) => setFilterSelected(data)}
              />
              {filterSelected && (
                <div className="max-w-64">
                  <MyInput placeholder="Filtro" onChange={(data: any) => getFilterData(data.target.value)} />
                </div>
              )}

            </div>
          </div>

          <Button
            onClick={createClientDisclosure.onOpen}
            appearance="primary"
            size="lg"
          >
            Adicionar
          </Button>
        </div>
        <Table autoHeight data={filteredData ?? clients}>
          <Column width={300} resizable fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={150}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={150}>
            <HeaderCell>Nome fantasia</HeaderCell>
            <Cell dataKey="fantasy" />
          </Column>

          <Column width={120}>
            <HeaderCell>CNPJ</HeaderCell>
            <Cell dataKey="cnpj" />
          </Column>

          <Column width={120}>
            <HeaderCell>Telefone</HeaderCell>
            <Cell dataKey="phone" />
          </Column>

          <Column width={200}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={100}>
            <HeaderCell>CEP</HeaderCell>
            <Cell dataKey="cep" />
          </Column>

          <Column width={150}>
            <HeaderCell>Endereço</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column width={60}>
            <HeaderCell>Número</HeaderCell>
            <Cell dataKey="number" />
          </Column>

          <Column width={120}>
            <HeaderCell>Bairro</HeaderCell>
            <Cell dataKey="district" />
          </Column>

          <Column width={50}>
            <HeaderCell>Estado</HeaderCell>
            <Cell dataKey="state" />
          </Column>

          <Column width={120}>
            <HeaderCell>Cidade</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column fixed="right" align="right" minWidth={100} flexGrow={1}>
            <HeaderCell>Editar</HeaderCell>

            <Cell style={{ paddingInline: "auto", paddingBlock: "5px" }} className="!w-full">
              {(rowData: ClientDataType) => (
                <div className="flex gap-2">
                  <IconButton
                    icon={<EditIcon />}
                    className="!bg-transparent focus:!bg-transparent hover:!bg-blue-500/25 !text-blue-500 hover:!text-blue-400 focus:!text-blue-500"
                    onClick={() => {
                      setClientSelected(rowData);
                      updateClientDisclosure.onOpen();
                    }}
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    className="!bg-transparent focus:!bg-transparent hover:!bg-red-500/25 !text-red-500 hover:!text-red-400 focus:!text-red-500"
                    onClick={() => {
                      setClientSelected(rowData);
                      deleteClientDisclosure.onOpen();
                    }}
                  />
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
      <CreateClientModal
        createHandler={createHandler}
        createClientDisclosure={createClientDisclosure}
      />
      <UpdateClientModal
        updateHandler={updateHandler}
        updateClientDisclosure={updateClientDisclosure}
        clientSelected={clientSelected}
      />
      <DeleteClientModal
        deleteHandler={deleteHandler}
        deleteClientDisclosure={deleteClientDisclosure}
      />
    </div>
  );
};
