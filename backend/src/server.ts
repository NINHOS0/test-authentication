import Fastify from "fastify";
import cors from "@fastify/cors";
import { LoginRoute } from "./routes/login.route";
import fastifyCookie, { type FastifyCookieOptions } from "@fastify/cookie";
import { UserRoutes } from "./routes/users.route";
import { ClientRoutes } from "./routes/clients.route";

const app = Fastify({
  logger: true,
});

const start = () => {
  try {
    app.register(cors, {
      origin: "*",
    });

    app.register(fastifyCookie, {
      secret: "my-secret", // for cookies signature
      parseOptions: {}     // options for parsing cookies
    } as FastifyCookieOptions)

    // app.setValidatorCompiler(validatorCompiler);
    // app.setSerializerCompiler(serializerCompiler);

    app.register(LoginRoute);

    app.register(UserRoutes)
    app.register(ClientRoutes)

    app.listen({ port: 3333 }).then(() => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start()