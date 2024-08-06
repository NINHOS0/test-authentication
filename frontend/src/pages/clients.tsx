import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { CreateClientFormType } from "../utils/schemas/clients/CreateClientSchema";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { api } from "../lib/axios";
import { ClientDataType } from "../utils/schemas/clients/ClientData";
import { CreateClientModal } from "../components/client/createClientModal";

export const ClientsPage = () => {
  const createClientDisclosure = useDisclosure()
  const [clients, setClients] = useState<ClientDataType[]>([]);

  const [clientSelected, setClientSelected] = useState<ClientDataType | undefined>(
    undefined
  );

  const toast = useToast({
    duration: 5000,
    isClosable: false,
    position: "bottom-right",
  });

  const createHandler: SubmitHandler<CreateClientFormType> = (data) => {
    console.log(data);
    
    createClientDisclosure.onClose();
    api
      .post("/clients", data)
      .then((res: AxiosResponse<{ message: string; data: ClientDataType }>) => {
        toast({
          title: "Criando cliente",
          description: res.data.message ?? "",
          status: "success",
        });
        setClients([...clients, res.data.data]);
      })
      .catch((err: AxiosError<{ error?: string }>) => {
        console.log(err);
        
        toast({
          title: "Criando cliente",
          description: err.response?.data.error ?? "Erro ao criar cliente",
          status: "error",
        });
      });
  };

  return (
    <>
      <div className="overflow-x-auto m-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Clientes</h1>

          <Button colorScheme="blue" onClick={createClientDisclosure.onOpen}>
            Adicionar
          </Button>
        </div>
        <TableContainer>
          <Table>

            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Fantasia</Th>
                <Th>CEP</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer >
      </div>
      <CreateClientModal
        createHandler={createHandler}
        createClientDisclosure={createClientDisclosure}
      />
      {/* <DeleteUserModal
        deleteHandler={deleteHandler}
        deleteUserDisclosure={deleteUserDisclosure}
      />
      <UpdateUserModal
        updateHandler={updateHandler}
        updateUserDisclosure={updateUserDisclosure}
        userSelected={userSelected}
      /> */}
    </>
  );
};
