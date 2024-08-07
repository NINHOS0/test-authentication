import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UpdateUserFormSchema, UpdateUserFormType, UserDataType } from "../../utils/schemas/users-schemas";
import { Button, Modal } from "rsuite";

import { UseDisclosureReturn } from "../../utils/useDisclosure";
import { Input } from "@chakra-ui/react";

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
  const { register, handleSubmit, reset } = useForm<UpdateUserFormType>({
    resolver: zodResolver(UpdateUserFormSchema),
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
      <Modal.Body className="flex flex-col gap-2 text-white">
        <Input
          placeholder="Nome de usuário"
          defaultValue={userSelected && userSelected.username}
          {...register("username")}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          {...register("password")}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(updateHandler)} appearance="primary">
          Ok
        </Button>
        <Button onClick={updateUserDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
