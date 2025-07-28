import { FastifyPluginAsync } from "fastify";

const productRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async (req, reply) => {
    const products = await app.prisma.product.findMany();
    reply.send(products);
  });
  app.post("/", async (req, reply) => {
    const { name, price, stock } = req.body as any;
    const product = await app.prisma.product.create({ data: { name, price, stock } });
    reply.code(201).send(product);
  });
};
export default productRoutes;
