import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

export const prismaPlugin = fp(async (server: FastifyInstance) => {
  const prisma = new PrismaClient();
  server.decorate("prisma", prisma);
  server.addHook("onClose", async (srv) => {
    await srv.prisma.$disconnect();
  });
});
