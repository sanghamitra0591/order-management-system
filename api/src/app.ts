import fastify from "fastify";
import cors from "@fastify/cors";
import { prismaPlugin } from "./prisma";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";

export function buildApp() {
  const app = fastify({ logger: true });
  app.register(cors, { origin: "*", methods: ["GET", "POST", "PATCH"] });
  app.register(prismaPlugin);

  app.get("/healthz", async () => "ok");
  app.register(userRoutes, { prefix: "/users" });
  app.register(productRoutes, { prefix: "/products" });
  app.register(orderRoutes, { prefix: "/orders" });

  return app;
}
