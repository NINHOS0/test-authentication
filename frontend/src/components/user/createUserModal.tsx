import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CreateUserFormSchema, CreateUserFormType } from "../../utils/schemas/users-schemas";
import { UseDisclosureReturn } from "../../utils/useDisclosure";
import { Button, Modal } from "rsuite";
import { Input } from "@chakra-ui/react";

interface CreateUserModalProps {
  createUserDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateUserFormType>
}

export const CreateUserModal = ({
  createUserDisclosure,
  createHandler
}: CreateUserModalProps) => {
  const { register, handleSubmit, reset } = useForm<CreateUserFormType>({
    resolver: zodResolver(CreateUserFormSchema)
  });


  useEffect(() => {
    reset();
  }, [createUserDisclosure.isOpen, reset]);


  return (
    <Modal
      open={createUserDisclosure.isOpen}
      onClose={createUserDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>Adicionar usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-2 text-white">
        <Input placeholder="Nome de usuário" {...register("username")} />
        <Input placeholder="Senha" type="password" {...register("password")} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(createHandler)} appearance="primary">
          Ok
        </Button>
        <Button onClick={createUserDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
