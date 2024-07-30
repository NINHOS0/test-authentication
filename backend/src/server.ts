import Fastify from "fastify";
import cors from "@fastify/cors";
import { LoginRoute } from "./routes/login.route";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { CreateUserRoute } from "./routes/create-user.route";
import { UpdateUserRoute } from "./routes/update-user.route";
import { DeleteUserRoute } from "./routes/delete-user.route";
import { GetUsersRoute } from "./routes/get-users.route";

const app = Fastify();

app.register(cors, {
  origin: "*"
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(LoginRoute);
app.register(CreateUserRoute);
app.register(UpdateUserRoute);
app.register(DeleteUserRoute);
app.register(GetUsersRoute);

app.listen({ port: 3333 }).then(() => {
  console.log("Server started");
});
