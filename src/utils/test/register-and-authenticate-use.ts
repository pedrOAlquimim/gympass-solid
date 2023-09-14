import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import supertest from "supertest"

export async function registerAndAuthenticateUse(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      email: 'johnsdoe@example.com',
      password_hash: await hash('123456', 6),
      name: 'John Doe',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    }
  })
  const authResponse = await supertest(app.server)
    .post('/sessions')
    .send({
      email: 'johnsdoe@example.com',
      password: '123456',
    })

  const { token } = authResponse.body

  return {
    token
  }
}