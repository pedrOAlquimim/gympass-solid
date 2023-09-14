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
  it('should be able to fetch a nearby gym', async () => {
    const { token } = await registerAndAuthenticateUse(app, true)

    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'Near Gym',
        description: '',
        phone: '',
        latitude: -22.9568277,
        longitude: -47.0090684, 
      })
      .set('Authorization', `Bearer ${token}`)
    
    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'Far Gym',
        description: '',
        phone: '',
        latitude: -23.1016963,
        longitude: -47.2031966,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.9568277,
        longitude: -47.0090684, 
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      })
    ])
  })
})