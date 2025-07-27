import { FastifyPluginAsync } from 'fastify';
import * as productService from '../services/product.service';

const productRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (req, reply) => {
    const products = await productService.listProducts(app.prisma);
    reply.send(products);
  });

  app.post('/', async (req, reply) => {
    const data = req.body as any;
    const product = await productService.createProduct(app.prisma, data);
    reply.code(201).send(product);
  });
};

export default productRoutes;
