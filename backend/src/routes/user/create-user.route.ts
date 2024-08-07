import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { hashData } from "../../utils/hashData";
import { auth } from "../auth";

export async function CreateUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/users",
    {
      preHandler: auth,
      schema: {
        body: z.object({
          username: z.string().trim(),
          password: z.string().trim(),
        }),
      },
    },
    async (req, res) => {
      const { username, password } = req.body;

      const isUsernameExist = await prisma.users.findUnique({
        where: {
          username
        },
      });

      if (isUsernameExist) {
        return res.status(406).send({ error: "Nome de usuário já existente!" });
      }

      const hashedPassword = await hashData(password);

      if (!hashedPassword || typeof hashedPassword !== "string") {
        return res.status(500)
      }

      const newUser = await prisma.users.create({
        data: {
          username,
          password: hashedPassword
        }
      })

      return { message: "Usuário criado com sucesso!", data: newUser }
    }
  );
};
