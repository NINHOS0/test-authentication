import type { FastifyReply, FastifyRequest } from "fastify"

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const authToken = request.headers["authorization"];
  if (authToken) {
    return
  }

  reply.status(401).send({ message: "Você não está autenticado!" })
}