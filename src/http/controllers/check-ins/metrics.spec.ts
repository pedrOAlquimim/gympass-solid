import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { registerAndAuthenticateUse } from "@/utils/test/register-and-authenticate-use";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe('Metrics (check-ins) controller E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user history', async () => {
    const { token } = await registerAndAuthenticateUse(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Teste',
        latitude: -22.9189261,
        longitude: -46.9493731,
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        },
      ]
    })

    const response = await supertest(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])
  })
})