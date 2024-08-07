import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { UseDisclosureReturn } from "../../utils/useDisclosure";
import { CreateClientFormSchema, type CreateClientFormType } from "../../utils/schemas/clients-schemas";

interface CreateClientModalProps {
  createClientDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateClientFormType>
}

export const CreateClientModal = ({
  createClientDisclosure,
  createHandler
}: CreateClientModalProps) => {
  const {register, handleSubmit, reset } = useForm<CreateClientFormType>({
    resolver: zodResolver(CreateClientFormSchema)
  });
  
  useEffect(() => {
    reset();
  }, [createClientDisclosure.isOpen, reset]);


  return (
    <Modal
      isOpen={createClientDisclosure.isOpen}
      onClose={createClientDisclosure.onClose}
      size={"lg"}
    >
      <ModalOverlay />
      <ModalContent bgColor={"rgb(24, 24, 27)"} color={"white"}>
        <ModalHeader >Adicionar novo cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-2">
          <Input placeholder="CNPJ" {...register("cnpj")}/>
          <div className="flex gap-2">
            <Input placeholder="Nome" {...register("name")}/>
            <Input placeholder="Nome Fantasia" {...register("fantasy")}/>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Endereço" {...register("address")}/>
            <Input placeholder="Número" type="number" {...register("number")}/>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Complemento" {...register("complement")}/>
            <Input placeholder="CEP" type="number" {...register("cep")}/>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Estado" {...register("state")}/>
            <Input placeholder="Cidade" {...register("city")}/>
            <Input placeholder="Bairro" {...register("district")}/>
          </div>
          <Input placeholder="Email" {...register("email")}/>
          <Input placeholder="Telefone" {...register("phone")}/>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(createHandler)}
          >
            Criar
          </Button>
          <Button colorScheme="red" onClick={createClientDisclosure.onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
