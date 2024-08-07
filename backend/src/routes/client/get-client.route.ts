import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { auth } from "../auth";

export async function GetClientsRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/clients",
    {
      preHandler: auth,
    },
    async (req, res) => {
      const clients = await prisma.clients.findMany();

      if (!clients) {
        return res.status(404).send({ error: "Clientes não encontrados!" });
      }

      return { clients };
    }
  );
}
