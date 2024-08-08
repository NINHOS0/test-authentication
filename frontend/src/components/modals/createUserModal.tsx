import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CreateUserFormSchema, CreateUserFormType } from "../../utils/schemas/users-schemas";
import { UseDisclosureReturn } from "../../hooks/useDisclosure";
import { Button, Modal } from "rsuite";
import { MyInput } from "../input";

interface CreateUserModalProps {
  createUserDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateUserFormType>
}

export const CreateUserModal = ({
  createUserDisclosure,
  createHandler
}: CreateUserModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateUserFormType>({
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
      <Modal.Body className="flex flex-col gap-2 text-white p-1 pr-4">
        <MyInput
          label="Nome de usuário"
          id="username"
          {...register("username")}
          error={errors.username && errors.username.message}
        />
        <MyInput
          label="Senha"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password && errors.password.message}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(createHandler)} appearance="primary">
          Adicionar
        </Button>
        <Button onClick={createUserDisclosure.onClose} appearance="subtle" className="!text-red-400 hover:!bg-white/10">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
