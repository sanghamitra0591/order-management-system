import { FastifyPluginAsync } from 'fastify';
import * as userService from '../services/user.service';

const userRoutes: FastifyPluginAsync = async (app) => {
  // Get all users
  app.get('/', async (req, reply) => {
    const users = await userService.listUsers(app.prisma);
    reply.send(users);
  });

  // Get single user
  app.get('/:id', async (req, reply) => {
    const { id } = req.params as any;
    const user = await userService.getUser(app.prisma, Number(id));
    if (!user) return reply.code(404).send({ error: 'User not found' });
    reply.send(user);
  });

  // Create user
  app.post('/', async (req, reply) => {
    const data = req.body as any;
    const user = await userService.createUser(app.prisma, data);
    reply.code(201).send(user);
  });
};

export default userRoutes;
