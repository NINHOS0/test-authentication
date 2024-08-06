import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function GetUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/users",
    async (req, res) => {
      const users = await prisma.users.findMany();

      if (!users) {
        return res.status(404).send({ error: "Usuários não encontrados!" });
      }

      return { users };
    }
  );
}
