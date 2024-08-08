import { Button, Modal } from "rsuite";
import { UseDisclosureReturn } from "../../hooks/useDisclosure";

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
        <Button onClick={deleteHandler} appearance="primary" className="!bg-red-500 hover:!bg-red-400">
          Confirmar
        </Button>
        <Button onClick={deleteClientDisclosure.onClose}  appearance="subtle" className="hover:!bg-white/10">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
