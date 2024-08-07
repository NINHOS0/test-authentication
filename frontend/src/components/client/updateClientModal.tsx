import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Modal } from "rsuite";
import { Input } from "@chakra-ui/react";
import { UseDisclosureReturn } from "../../utils/useDisclosure";
import {
  ClientDataType,
  UpdateClientFormSchema,
  UpdateClientFormType,
} from "../../utils/schemas/clients-schemas";
import { MyInput } from "../input";

interface UpdateClientModalProps {
  updateClientDisclosure: UseDisclosureReturn;
  updateHandler: SubmitHandler<UpdateClientFormType>;
  clientSelected: ClientDataType | undefined;
}

export const UpdateClientModal = ({
  updateClientDisclosure,
  updateHandler,
  clientSelected,
}: UpdateClientModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateClientFormType>({
    resolver: zodResolver(UpdateClientFormSchema),
    values: clientSelected,
  });

  useEffect(() => {
    reset();
  }, [updateClientDisclosure.isOpen, reset]);

  return (
    <Modal
      open={updateClientDisclosure.isOpen}
      onClose={updateClientDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>Modificar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-1 text-white p-1">
        <MyInput label="CNPJ" disabled defaultValue={clientSelected?.cnpj}/>
        <div className="flex gap-2 w-full">
          <MyInput
            label="Nome"
            id="name"
            {...register("name")}
            error={errors.name && errors.name.message}
          />
          <MyInput
            label="Nome Fantasia"
            id="fantasy"
            {...register("fantasy")}
            error={errors.fantasy && errors.fantasy.message}
          />
        </div>
        <div className="flex gap-2">
          <MyInput
            label="Endereço"
            id="address"
            {...register("address")}
            error={errors.address && errors.address.message}
          />
          <MyInput
            label="Número"
            id="number"
            {...register("number")}
            error={errors.number && errors.number.message}
          />
        </div>
        <div className="flex gap-2">
          <MyInput
            label="Complemento"
            id="complement"
            {...register("complement")}
            error={errors.complement && errors.complement.message}
          />
          <MyInput
            label="CEP"
            id="cep"
            {...register("cep")}
            error={errors.cep && errors.cep.message}
          />
        </div>
        <div className="flex gap-2">
          <MyInput
            label="Estado"
            id="state"
            {...register("state")}
            error={errors.state && errors.state.message}
          />
          <MyInput
            label="Cidade"
            id="city"
            {...register("city")}
            error={errors.city && errors.city.message}
          />
          <MyInput
            label="Bairro"
            id="district"
            {...register("district")}
            error={errors.district && errors.district.message}
          />
        </div>
        <MyInput
          label="E-Mail"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email && errors.email.message}
        />
        <MyInput
          label="Telefone"
          id="phone"
          {...register("phone")}
          error={errors.phone && errors.phone.message}
        />
        {/* <MyMaskedInput
          label="Telefone"
          id="phone"
          {...register("phone")}
          error={errors.phone && errors.phone.message}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(updateHandler)} appearance="primary">
          Ok
        </Button>
        <Button onClick={updateClientDisclosure.onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
