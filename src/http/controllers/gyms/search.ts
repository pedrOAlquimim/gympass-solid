import { PrismaSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const requestQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = requestQuerySchema.parse(request.query)

  const searchGymUseCase = new PrismaSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.factoryMethod().execute({
    query,
    page
  })

  return reply.status(200).send({ gyms }) 
}