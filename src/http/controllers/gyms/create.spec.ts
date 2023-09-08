import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create controlle E2E', () => {
  it('should be able to create gym', async () => {
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

    const response = await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'Teste',
        description: 'teste academy',
        phone: '19900000000',
        latitude: -22.9189261,
        longitude: -46.9493731,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(201)
  })
})