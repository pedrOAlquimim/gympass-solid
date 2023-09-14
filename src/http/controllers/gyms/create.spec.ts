import { app } from "@/app";
import { registerAndAuthenticateUse } from "@/utils/test/register-and-authenticate-use";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create (gyms) controlle E2E', () => {
  it('should be able to create gym', async () => {
    const { token } = await registerAndAuthenticateUse(app, true)

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