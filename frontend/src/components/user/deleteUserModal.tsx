import { Button, Modal } from "rsuite";
import { UseDisclosureReturn } from "../../utils/useDisclosure";

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
        <Button onClick={deleteHandler} appearance="primary">
          Ok
        </Button>
        <Button onClick={deleteUserDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
