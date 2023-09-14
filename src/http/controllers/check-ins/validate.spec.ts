import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { registerAndAuthenticateUse } from "@/utils/test/register-and-authenticate-use";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create (check-ins) controller E2E', () => {
  it('should be able to check-in', async () => {
    const { token } = await registerAndAuthenticateUse(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Teste',
        latitude: -22.9189261,
        longitude: -46.9493731,
      }
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await supertest(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  })
})