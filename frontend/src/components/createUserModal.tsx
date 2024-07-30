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
import { CreateUserFormSchema, type CreateUserFormType } from "../utils/schemas/CreateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface CreateUserModalProps {
  createUserDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateUserFormType>
}

export const CreateUserModal = ({
  createUserDisclosure,
  createHandler
}: CreateUserModalProps) => {
  const {register, handleSubmit, reset } = useForm<CreateUserFormType>({
    resolver: zodResolver(CreateUserFormSchema)
  });

  
  useEffect(() => {
    reset();
  }, [createUserDisclosure.isOpen, reset]);


  return (
    <Modal
      isOpen={createUserDisclosure.isOpen}
      onClose={createUserDisclosure.onClose}
    >
      <ModalOverlay/>
      <ModalContent bgColor={"rgb(24, 24, 27)"} color={"white"}>
        <ModalHeader >Criar novo usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-2">
          <Input placeholder="Nome de usuário" {...register("username")}/>
          <Input placeholder="Senha" type="password" {...register("password")}/>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(createHandler)}
          >
            Criar
          </Button>
          <Button colorScheme="red" onClick={createUserDisclosure.onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
