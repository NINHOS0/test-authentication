import { Button, Modal } from "rsuite";
import { UseDisclosureReturn } from "../../utils/useDisclosure";

interface DeleteClientModalProps {
  deleteClientDisclosure: UseDisclosureReturn;
  deleteHandler: () => void
}

export const DeleteClientModal = ({
  deleteClientDisclosure,
  deleteHandler
}: DeleteClientModalProps) => {

  return (
    <Modal
      open={deleteClientDisclosure.isOpen}
      onClose={deleteClientDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          Remover cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-white">
        <p className="text-lg">Tem certeza que deseja remover este cliente?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteHandler} appearance="primary">
          Ok
        </Button>
        <Button onClick={deleteClientDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
