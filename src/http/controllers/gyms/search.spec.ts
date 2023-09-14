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

describe('Search (gyms) controlle E2E', () => {
  it('should be able to search a gym', async () => {
    const { token } = await registerAndAuthenticateUse(app, true)

    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'JavaScript Test',
        description: 'teste academy',
        phone: '19900000000',
        latitude: -22.9189261,
        longitude: -46.9493731,
      })
      .set('Authorization', `Bearer ${token}`)
 
      
    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'TypeScript Test',
        description: 'teste academy',
        phone: '19900000000',
        latitude: -22.9189261,
        longitude: -46.9493731,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app.server)
      .get('/gyms/search')
      .query({
        query: 'TypeScript',
        page: 1
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Test',
      })
    ])
  })
})