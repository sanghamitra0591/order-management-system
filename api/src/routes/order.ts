import { FastifyPluginAsync } from "fastify";

const STATUS = ["PLACED", "PICKED", "SHIPPED", "DELIVERED"] as const;

const orderRoutes: FastifyPluginAsync = async (app) => {
  // List/search orders, with user+product info
  app.get("/", async (req, reply) => {
    const { search } = req.query as any;

    const where = search
      ? {
        OR: [
          { status: { contains: search, mode: 'insensitive' as const } },
          { user: { name: { contains: search, mode: 'insensitive' as const } } }
        ]
      }
      : {};


    const orders = await app.prisma.order.findMany({
      where,
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: "desc" },
    });
    reply.send(orders);
  });

  // CSV export
  app.get("/export", async (req, reply) => {
    const orders = await app.prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: "desc" }
    });
    let out = "OrderID,User,Status,Payment,CreatedAt,Items\n";
    for (const o of orders) {
      out += `${o.id},${o.user?.name},${o.status},${o.paymentReceived ? "Yes" : "No"},${o.createdAt},"${o.items.map((i: any) => `${i.product?.name} x${i.quantity}`).join("; ")}"\n`;
    }
    reply.header('Content-Type', 'text/csv');
    reply.send(out);
  });

  // Place order (locks stock, staff or customer)
  app.post("/", async (req, reply) => {
    try {
      const { userId, items, paymentReceived } = req.body as any;
      const result = await app.prisma.$transaction(async tx => {
        for (const item of items) {
          const prod = await tx.product.findUnique({ where: { id: item.productId } });
          if (!prod || prod.stock < item.quantity) throw new Error("Not enough stock for product " + item.productId);
          await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
        }
        return tx.order.create({
          data: {
            userId,
            status: "PLACED",
            paymentReceived: !!paymentReceived,
            items: { create: items.map((it: any) => ({ productId: it.productId, quantity: it.quantity })) }
          },
          include: { items: { include: { product: true } }, user: true }
        });
      });
      reply.code(201).send(result);
    } catch (err: any) {
      reply.status(400).send({ error: err.message });
    }
  });

  // Order detail by ID (customer self-serve)
  app.get("/:id", async (req, reply) => {
    const order = await app.prisma.order.findUnique({
      where: { id: Number((req.params as any).id) },
      include: { items: { include: { product: true } }, user: true }
    });
    if (!order) return reply.code(404).send({ error: "Not found" });
    reply.send(order);
  });

  // Update status or payment received
  app.patch("/:id/status", async (req, reply) => {
    const { status, paymentReceived } = req.body as any;
    if (status && !STATUS.includes(status)) return reply.status(400).send({ error: "Invalid status" });
    const order = await app.prisma.order.update({
      where: { id: Number((req.params as any).id) },
      data: {
        ...(status && { status }),
        ...(paymentReceived !== undefined && { paymentReceived })
      }
    });
    reply.send(order);
  });
};
export default orderRoutes;
