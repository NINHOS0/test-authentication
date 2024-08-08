import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { validate } from "../utils/validation";
import jwt from "jsonwebtoken";
import env from "../utils/env";

const LoginRouteSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
})

export async function LoginRoute(app: FastifyInstance) {
  app.post(
    "/api/validate",
    async (request, reply) => {
      const body = LoginRouteSchema.safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ message: body.error.flatten() })
      }

      const { username, password } = body.data

      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado!" });
      }

      const isValidate = await validate(password, user.password);
      if (!isValidate) {
        return reply.status(401).send({ message: "Senha incorreta!" });
      }

      const token = jwt.sign({ username }, env.JWT_KEY);

      return reply.status(200).send({ message: "Logado com sucesso!", token });
    }
  );
}
