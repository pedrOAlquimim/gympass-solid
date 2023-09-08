import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

beforeAll(async () => {
  await app.ready()
})


afterAll(async () => {
  await app.close()
})

describe('Authenticate controller E2E', () => {
  it('should be able to authentica the user', async () => {
    await supertest(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johnsdoe@example.com',
        password: '123456',
      })
      .expect(201)

    const response = await supertest(app.server)
      .post('/sessions')
      .send({
        password: '123456',
        email: 'johnsdoe@example.com',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})