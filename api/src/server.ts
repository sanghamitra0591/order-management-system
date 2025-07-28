// src/server.ts
import Fastify from 'fastify'
import prismaPlugin from './prisma'
import userRoutes from './routes/user'

const app = Fastify()

app.register(prismaPlugin)
app.register(userRoutes, { prefix: '/users' })

app.listen({ port: 4000 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running on port 4000')
})
