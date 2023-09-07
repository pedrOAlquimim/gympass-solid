import { afterAll, beforeAll, describe, expect, it } from "vitest";
import supertest from 'supertest'
import { app } from "@/app";

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register controller`(E2E)', () => {
  it('should be able to register a new user', async () => {
    const register = await supertest(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johnsdoe@example.com',
        password: '123456',
      })
    
      expect(register.statusCode).toEqual(201)
  })
})