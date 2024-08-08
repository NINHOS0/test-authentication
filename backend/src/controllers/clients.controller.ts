import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";

const CreateClientBodySchema = z.object({
  cnpj: z.string().min(10).max(14),
  name: z.string(),
  fantasy: z.string(),
  address: z.string(),
  number: z.coerce.number(),
  complement: z.string(),
  cep: z.coerce.number(),
  district: z.string(),
  city: z.string(),
  state: z.string().min(2).max(2),
  email: z.string().email(),
  phone: z.coerce.string(),
});

const UpdateClientBodySchema = z.object({
  name: z.string(),
  fantasy: z.string(),
  address: z.string(),
  number: z.coerce.number(),
  complement: z.string(),
  cep: z.coerce.number(),
  district: z.string(),
  city: z.string(),
  state: z.string().min(2).max(2),
  email: z.string().email(),
  phone: z.coerce.string(),
});

export class ClientController {
  static async getClients(_: FastifyRequest, reply: FastifyReply) {
    const clients = await prisma.clients.findMany();

    if (!clients) {
      return reply.status(404).send({ message: "Nenhum cliente encontrado!" });
    }

    return { clients };
  }

  static async createClient(request: FastifyRequest, reply: FastifyReply) {
    const body = CreateClientBodySchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send({ message: body.error.flatten() });
    }

    const { cnpj, name, fantasy, address, number, complement, cep, district, city, state, email, phone } = body.data;

    const isClientExist = await prisma.clients.findUnique({
      where: {
        cnpj
      },
    });

    if (isClientExist) {
      return reply.status(406).send({ message: "Já existe um cliente registrado com esse cnpj!" });
    }

    const newClient = await prisma.clients.create({
      data: {
        cnpj,
        name,
        fantasy,
        address,
        number,
        complement,
        cep,
        district,
        city,
        state,
        email,
        phone
      }
    })

    return { message: "Cliente registrado com sucesso!", client: newClient }
  }

  static async updateClient(request: FastifyRequest, reply: FastifyReply) {
    const params = z.object({ clientId: z.string().trim().uuid() }).safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({ message: params.error.flatten() });
    }

    const body = UpdateClientBodySchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ message: body.error.flatten() });
    }

    const { clientId } = params.data
    const { name, fantasy, address, number, complement, cep, district, city, state, email, phone } = body.data;

    const user = await prisma.clients.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: "Cliente não encontrado!" });
    }

    const newClient = await prisma.clients.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        fantasy,
        address,
        number,
        complement,
        cep,
        district,
        city,
        state,
        email,
        phone
      },
    });

    return { message: "Cliente modificado com sucesso!", client: newClient };
  }

  static async deleteClient(request: FastifyRequest, reply: FastifyReply) {
    const params = z.object({ clientId: z.string().trim().uuid() }).safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({ message: params.error.flatten() });
    }

    const { clientId } = params.data

    const isClientExist = await prisma.clients.findUnique({
      where: {
        id: clientId
      },
    });

    if (!isClientExist) {
      return reply.status(404).send({ message: "Cliente não encontrado!" });
    }

    const result = await prisma.clients.delete({
      where: {
        id: clientId
      }
    })

    if (!result) {
      return reply.status(500)
    }

    return { message: "Cliente removido com sucesso!" }
  }
}
