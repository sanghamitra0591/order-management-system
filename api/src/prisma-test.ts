import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const app: FastifyInstance = fastify();

app.decorate("prisma", new PrismaClient());

app.get("/healthz", async () => "ok");

app.listen(3000);
