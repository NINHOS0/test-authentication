import type { FastifyInstance } from "fastify";
import { auth } from "./auth";
import { ClientController } from "../controllers/clients.controller";

export const ClientRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/api/clients", { preHandler: auth }, ClientController.getClients);
  fastify.post("/api/clients", { preHandler: auth }, ClientController.createClient);
  fastify.patch("/api/clients/:clientId", { preHandler: auth }, ClientController.updateClient);
  fastify.delete("/api/clients/:clientId", { preHandler: auth }, ClientController.deleteClient);
}
