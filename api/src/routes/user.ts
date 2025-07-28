import { FastifyPluginAsync } from "fastify";

const userRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async (req, reply) => {
    const users = await app.prisma.user.findMany();
    reply.send(users);
  });
  app.get("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    const u = await app.prisma.user.findUnique({ where: { id } });
    if (!u) return reply.status(404).send({ error: "User not found" });
    reply.send(u);
  });
  app.post("/", async (req, reply) => {
    const { name, email, isAdmin = false } = req.body as any;
    const user = await app.prisma.user.create({ data: { name, email, isAdmin } });
    reply.code(201).send(user);
  });
};
export default userRoutes;
