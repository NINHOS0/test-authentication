import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { hashData } from "../../utils/hashData";

export async function UpdateUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/api/users/:userId",
    {
      schema: {
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          username: z.string().trim(),
          password: z.string().trim(),
        }),
      },
    },
    async (req, res) => {
      const { userId } = req.params;
      const { username, password } = req.body;

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado!" });
      }

      const isUsernameExist = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (isUsernameExist) {
        return res.status(406).send({ error: "Nome de usuário já existente!" });
      }
      
      const hashedPassword = await hashData(password);

      if (!hashedPassword) {
        return res.status(500);
      }

      const newUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          username,
          password: hashedPassword,
        },
      });

      return { message: "Usuário editado com sucesso!", data: newUser };
    }
  );
}
