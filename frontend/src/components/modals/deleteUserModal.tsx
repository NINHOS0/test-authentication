import { Button, Modal } from "rsuite";
import { UseDisclosureReturn } from "../../hooks/useDisclosure";

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
      open={deleteUserDisclosure.isOpen}
      onClose={deleteUserDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          Remover usuário
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-white">
        <p className="text-lg">Tem certeza que deseja remover este usuário?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteHandler} appearance="primary" className="!bg-red-500 hover:!bg-red-400">
          Confirmar
        </Button>
        <Button onClick={deleteUserDisclosure.onClose} appearance="subtle" className="hover:!bg-white/10">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
