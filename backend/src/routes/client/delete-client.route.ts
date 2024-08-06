import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";


export async function DeleteClientRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/api/clients/:clientId",
    {
      schema: {
        params: z.object({
          clientId: z.string().uuid(),
        })
      },
    },
    async (req, res) => {
      const { clientId } = req.params;

      const isClientExist = await prisma.clients.findUnique({
        where: {
          id: clientId
        },
      });

      if (!isClientExist) {
        return res.status(404).send({ error: "Cliente não encontrado!" });
      }

      const result = await prisma.clients.delete({
        where: {
          id: clientId
        }
      })

      if (!result) {
        return res.status(500)
      }

      return { message: "Cliente removido com sucesso!" }
    }
  );
};
