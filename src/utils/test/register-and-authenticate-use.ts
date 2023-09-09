import { FastifyInstance } from "fastify"
import supertest from "supertest"

export async function registerAndAuthenticateUse(app: FastifyInstance) {
  await supertest(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johnsdoe@example.com',
        password: '123456',
      })
      .expect(201)

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