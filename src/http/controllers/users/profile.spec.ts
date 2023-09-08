import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { string } from "zod";

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Profile controller E2E', () => {
  it('should be able to get user profile', async () => {
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
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
 
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      email: 'johnsdoe@example.com',
    }))
  })
})