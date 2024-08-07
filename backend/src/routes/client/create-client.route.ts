import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { auth } from "../auth";

export async function CreateClientRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/clients",
    {
      preHandler: auth,
      schema: {
        body: z.object({
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
        }),
      },
    },
    async (req, res) => {
      const { cnpj, name, fantasy, address, number, complement, cep, district, city, state, email, phone } = req.body;

      const isClientExist = await prisma.clients.findUnique({
        where: {
          cnpj
        },
      });

      if (isClientExist) {
        return res.status(406).send({ error: "Já existe um cliente com esse cnpj!" });
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

      return { message: "Cliente registrado com sucesso!", data: newClient }
    }
  );
};
