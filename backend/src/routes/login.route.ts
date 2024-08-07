import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { validate } from "../utils/validation";
import jwt from "jsonwebtoken";
import env from "../utils/env";
import { parse, serialize } from "cookie";

export async function LoginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/validate",
    {
      schema: {
        body: z.object({
          username: z.string().trim(),
          password: z.string().trim(),
        }),
      },
    },
    async (req, reply) => {
      const { username, password } = req.body;

      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      const isValidate = await validate(password, user.password);
      if (!isValidate) {
        return reply.status(401).send({ error: "Senha incorreta!" });
      }

      const token = jwt.sign({ username }, env.JWT_KEY);

      return reply.status(200).send({ message: "Logado com sucesso!", token });
    }
  );
}
