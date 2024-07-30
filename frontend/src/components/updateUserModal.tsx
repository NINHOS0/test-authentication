import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  UpdateUserFormSchema,
  type UpdateUserFormType,
} from "../utils/schemas/UpdateUserSchema";
import type { UserDataType } from "../utils/schemas/UserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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
      isOpen={updateUserDisclosure.isOpen}
      onClose={updateUserDisclosure.onClose}
    >
      <ModalOverlay />
      <ModalContent bgColor={"rgb(24, 24, 27)"} color={"white"}>
        <ModalHeader>Modificar usuário</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            reset();
          }}
        />
        <ModalBody className="flex flex-col gap-2">
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
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(updateHandler)}
          >
            Confirmar
          </Button>
          <Button
            colorScheme="red"
            onClick={updateUserDisclosure.onClose}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
