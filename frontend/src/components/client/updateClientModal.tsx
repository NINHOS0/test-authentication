import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Modal } from "rsuite";
import { Input } from "@chakra-ui/react";
import { UseDisclosureReturn } from "../../utils/useDisclosure";
import { ClientDataType, UpdateClientFormSchema, UpdateClientFormType } from "../../utils/schemas/clients-schemas";

interface UpdateClientModalProps {
  updateClientDisclosure: UseDisclosureReturn;
  updateHandler: SubmitHandler<UpdateClientFormType>;
  clientSelected: ClientDataType | undefined;
}

export const UpdateClientModal = ({
  updateClientDisclosure,
  updateHandler,
  clientSelected,
}: UpdateClientModalProps) => {
  const { register, handleSubmit, reset } = useForm<UpdateClientFormType>({
    resolver: zodResolver(UpdateClientFormSchema),
    values: clientSelected
  });

  useEffect(() => {
    reset();
  }, [updateClientDisclosure.isOpen, reset]);

  return (
    <Modal
      open={updateClientDisclosure.isOpen}
      onClose={updateClientDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>Modificar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-2 text-white">
        <Input placeholder="CNPJ" disabled defaultValue={clientSelected?.cnpj}/>
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
        <Button onClick={handleSubmit(updateHandler)} appearance="primary">
          Ok
        </Button>
        <Button onClick={updateClientDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
