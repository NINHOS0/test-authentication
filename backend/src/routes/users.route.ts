import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/users.controller";
import { auth } from "./auth";

export const UserRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/api/users", { preHandler: auth }, UserController.getUsers);
  fastify.post("/api/users", { preHandler: auth }, UserController.createUser);
  fastify.patch("/api/users/:userId", { preHandler: auth }, UserController.updateUser);
  fastify.delete("/api/users/:userId", { preHandler: auth }, UserController.deleteUser);
}
