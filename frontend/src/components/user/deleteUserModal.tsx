import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";

interface DeleteUserModalProps {
  deleteUserDisclosure: UseDisclosureReturn;
  deleteHandler: () => void
}

export const DeleteUserModal = ({
  deleteUserDisclosure,
  deleteHandler
}: DeleteUserModalProps) => {
  
  return (
    <Modal
      isOpen={deleteUserDisclosure.isOpen}
      onClose={deleteUserDisclosure.onClose}
    >
      <ModalOverlay />
      <ModalContent bgColor={"rgb(24, 24, 27)"} color={"white"}>
        <ModalHeader>Criar novo usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-2">
          <p className="text-lg">Tem certeza que deseja excluir este usuário?</p>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={deleteHandler}
          >
            Deletar
          </Button>
          <Button onClick={deleteUserDisclosure.onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
