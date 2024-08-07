import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { UseDisclosureReturn } from "../../utils/useDisclosure";
import { CreateClientFormSchema, type CreateClientFormType } from "../../utils/schemas/clients-schemas";
import { Button, Modal } from "rsuite";
import { Input } from "@chakra-ui/react";

interface CreateClientModalProps {
  createClientDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateClientFormType>
}

export const CreateClientModal = ({
  createClientDisclosure,
  createHandler
}: CreateClientModalProps) => {
  const { register, handleSubmit, reset } = useForm<CreateClientFormType>({
    resolver: zodResolver(CreateClientFormSchema)
  });

  useEffect(() => {
    reset();
  }, [createClientDisclosure.isOpen, reset]);


  return (
    <Modal open={createClientDisclosure.isOpen} onClose={createClientDisclosure.onClose}>
      <Modal.Header>
        <Modal.Title>Adicionar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-2 text-white">
        <Input placeholder="CNPJ" {...register("cnpj")} />
        <div className="flex gap-2">
          <Input placeholder="Nome" {...register("name")} />
          <Input placeholder="Nome Fantasia" {...register("fantasy")} />
        </div>
        <div className="flex gap-2">
          <Input placeholder="Endereço" {...register("address")} />
          <Input placeholder="Número" type="number" {...register("number")} />
        </div>
        <div className="flex gap-2">
          <Input placeholder="Complemento" {...register("complement")} />
          <Input placeholder="CEP" type="number" {...register("cep")} />
        </div>
        <div className="flex gap-2">
          <Input placeholder="Estado" {...register("state")} />
          <Input placeholder="Cidade" {...register("city")} />
          <Input placeholder="Bairro" {...register("district")} />
        </div>
        <Input placeholder="Email" {...register("email")} />
        <Input placeholder="Telefone" {...register("phone")} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(createHandler)} appearance="primary">
          Ok
        </Button>
        <Button onClick={createClientDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
