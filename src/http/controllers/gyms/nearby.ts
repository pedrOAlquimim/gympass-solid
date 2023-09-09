import { PrismaFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { latitude, longitude } = requestBodySchema.parse(request.query)

  const fetchNearbyGymsUseCase = new PrismaFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.factoryMethod().execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}