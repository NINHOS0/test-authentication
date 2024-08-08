import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UpdateUserFormSchema, UpdateUserFormType, UserDataType } from "../../utils/schemas/users-schemas";
import { Button, Modal } from "rsuite";
import { UseDisclosureReturn } from "../../hooks/useDisclosure";
import { MyInput } from "../input";

interface UpdateUserModalProps {
  updateUserDisclosure: UseDisclosureReturn;
  updateHandler: SubmitHandler<UpdateUserFormType>;
  userSelected: UserDataType | undefined;
}

export const UpdateUserModal = ({
  updateUserDisclosure,
  updateHandler,
  userSelected,
}: UpdateUserModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserFormType>({
    resolver: zodResolver(UpdateUserFormSchema),
    values: {
      username: userSelected?.username ?? "",
      password: ""
    }
  });

  useEffect(() => {
    reset();
  }, [updateUserDisclosure.isOpen, reset]);

  return (
    <Modal
      open={updateUserDisclosure.isOpen}
      onClose={updateUserDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>Modificar usuário</Modal.Title>
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
        <Button onClick={handleSubmit(updateHandler)} appearance="primary">
          Confirmar
        </Button>
        <Button onClick={updateUserDisclosure.onClose} appearance="subtle" className="!text-red-400 hover:!bg-white/10">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
