import { PrismaFecthUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const requestQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = requestQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = new PrismaFecthUserCheckInsHistoryUseCase()

  const userId = request.user.sub

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.factoryMethod().execute({
    page,
    userId,
  })

  return reply.status(200).send({ checkIns })
}