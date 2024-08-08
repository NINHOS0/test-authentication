import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";
import { hashData } from "../utils/hashData";

const CreateUserBodySchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

const UpdateUserBodySchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

export class UserController {
  static async getUsers(_: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.users.findMany();

      if (!users) {
        return reply.status(404).send({ error: "Nenhum usuário encontrado!" });
      }

      return { users };
  }

  static async createUser(request: FastifyRequest, reply: FastifyReply) {
    const body = CreateUserBodySchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send({ message: body.error.flatten() });
    }

    const { username, password } = body.data;

    const isUsernameExist = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      return reply
        .status(406)
        .send({ message: "Nome de usuário já existente!" });
    }

    const hashedPassword = await hashData(password);

    if (!hashedPassword || typeof hashedPassword !== "string") {
      return reply.status(500);
    }

    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return { message: "Usuário criado com sucesso!", user: newUser };
  }

  static async updateUser(request: FastifyRequest, reply: FastifyReply) {    
    const params = z.object({userId: z.string().trim().uuid()}).safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({ message: params.error.flatten() });
    }
    
    const body = UpdateUserBodySchema.safeParse(request.body);
    if (!body.success) {
      return reply.status(400).send({ message: body.error.flatten() });
    }

    const { userId } = params.data;
    const { username, password } = body.data;

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      const isUsernameExist = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (isUsernameExist) {
        return reply.status(406).send({ error: "Nome de usuário já existente!" });
      }
      
      const hashedPassword = await hashData(password);

      if (!hashedPassword) {
        return reply.status(500);
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

      return { message: "Usuário modificado com sucesso!", user: newUser };
  }

  static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const result = z.object({userId: z.string().trim().uuid()}).safeParse(request.params);

    if (!result.success) {
      return reply.status(400).send({ message: result.error.flatten() });
    }

    const { userId } = result.data;

    const isUsernameExist = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUsernameExist) {
      return reply.status(404).send({ error: "Usuário não encontrado!" });
    }

    const deletedUser = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    if (!deletedUser) {
      return reply.status(500);
    }

    return { message: "Usuário excluído com sucesso!" };
  }
}
