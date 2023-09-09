import { PrismaGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = new PrismaGetUserMetricsUseCase()

  const userId = request.user.sub

  const { countCheckIn } = await getUserMetricsUseCase.factoryMethod().execute({
    userId,
  })

  return reply.status(200).send({ countCheckIn })
}