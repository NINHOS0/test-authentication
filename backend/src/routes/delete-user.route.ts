import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";


export async function DeleteUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/api/users/:userId",
    {
      schema: {
        params: z.object({
          userId: z.string().uuid(),
        })
      },
    },
    async (req, res) => {
      const { userId } = req.params;

      const isUsernameExist = await prisma.users.findUnique({
        where: {
          id: userId
        },
      });

      if (!isUsernameExist) {
        return res.status(404).send({ error: "Usuário não encontrado!" });
      }

      const result = await prisma.users.delete({
        where: {
          id: userId
        }
      })

      if (!result) {
        return res.status(500)
      }

      return { message: "Usuário excluído com sucesso!" }
    }
  );
};
