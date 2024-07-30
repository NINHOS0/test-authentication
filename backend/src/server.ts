import Fastify from "fastify";
import cors from "@fastify/cors";
import { LoginRoute } from "./routes/login.route";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = Fastify();

app.register(cors, {
  origin: "*"
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(LoginRoute);

app.listen({ port: 3333 }).then(() => {
  console.log("Server started");
});
