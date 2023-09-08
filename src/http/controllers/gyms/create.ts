import { PrismaCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { title, description, phone, latitude, longitude } = requestBodySchema.parse(request.body)

  const createGymUsecase = new PrismaCreateGymUseCase()

  await createGymUsecase.factoryMethod().execute({
    title,
    description,
    phone,
    latitude,
    longitude
  })

  return reply.status(201).send()
}