import Fastify from "fastify";
import cors from "@fastify/cors";
import { LoginRoute } from "./routes/login.route";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { CreateUserRoute } from "./routes/user/create-user.route";
import { UpdateUserRoute } from "./routes/user/update-user.route";
import { DeleteUserRoute } from "./routes/user/delete-user.route";
import { GetUsersRoute } from "./routes/user/get-users.route";
import { CreateClientRoute } from "./routes/client/create-client.route";
import { UpdateClientRoute } from "./routes/client/update-client.route";
import { DeleteClientRoute } from "./routes/client/delete-client.route";
import { GetClientsRoute } from "./routes/client/get-client.route";
import { auth } from "./routes/auth";
import fastifyCookie, { type FastifyCookieOptions } from "@fastify/cookie";
import { UserRoutes } from "./routes/users.route";

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

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // app.addHook("preHandler", auth);

    app.register(UserRoutes)
    app.register(LoginRoute);
    // app.register(CreateUserRoute);
    // app.register(UpdateUserRoute);
    // app.register(DeleteUserRoute);
    // app.register(GetUsersRoute);
    
    app.register(CreateClientRoute);
    app.register(UpdateClientRoute);
    app.register(DeleteClientRoute);
    app.register(GetClientsRoute);

    app.listen({ port: 3333 }).then(() => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start()