import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function UpdateClientRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/api/clients/:clientId",
    {
      schema: {
        params: z.object({
          clientId: z.string().uuid(),
        }),
        body: z.object({
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
      const { clientId } = req.params;
      const { name, fantasy, address, number, complement, cep, district, city, state, email, phone } = req.body;

      const user = await prisma.clients.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!user) {
        return res.status(404).send({ error: "Cliente não encontrado!" });
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

      return { message: "Cliente editado com sucesso!", data: newClient };
    }
  );
}
