import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { UseDisclosureReturn } from "../../hooks/useDisclosure";
import {
  CreateClientFormSchema,
  type CreateClientFormType,
} from "../../utils/schemas/clients-schemas";
import { Button, Modal } from "rsuite";
import { MyInput } from "../input";
import { MyMaskedInput } from "../maskedInput";

interface CreateClientModalProps {
  createClientDisclosure: UseDisclosureReturn;
  createHandler: SubmitHandler<CreateClientFormType>;
}

export const CreateClientModal = ({
  createClientDisclosure,
  createHandler,
}: CreateClientModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateClientFormType>({
    resolver: zodResolver(CreateClientFormSchema),
  });

  console.log(errors);

  useEffect(() => {
    reset();
  }, [createClientDisclosure.isOpen, reset]);

  return (
    <Modal
      open={createClientDisclosure.isOpen}
      onClose={createClientDisclosure.onClose}
    >
      <Modal.Header>
        <Modal.Title>Adicionar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-1 text-white p-1 pr-4">
        <MyInput
          label="CNPJ"
          id="cnpj"
          {...register("cnpj")}
          error={errors.cnpj && errors.cnpj.message}
        />
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(createHandler)} appearance="primary">
          Adicionar
        </Button>
        <Button onClick={createClientDisclosure.onClose} appearance="subtle" className="!text-red-400 hover:!bg-white/10">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
