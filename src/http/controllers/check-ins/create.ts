import { MaxDistanceReachedError } from "@/use-cases/errors/max-distance-reached-error";
import { MaxNumberOfCheckInsError } from "@/use-cases/errors/max-number-of-check-ins-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { PrismaCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    gymId: z.string(),
  })

  const requestQuerySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { gymId } = requestParamsSchema.parse(request.params)

  const { latitude, longitude } = requestQuerySchema.parse(request.query)
  
  try {
    const checkInUseCase = new PrismaCheckInUseCase()

    const userId = request.user.sub

    await checkInUseCase.factoryMethod().execute({
      gymId,
      userId,
      userLatitude: latitude,
      userLongitude: longitude,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof MaxDistanceReachedError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof MaxNumberOfCheckInsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}