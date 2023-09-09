import { LateCheckInValidationTime } from "@/use-cases/errors/late-check-in-validation-time-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { PrismaValidateCheckInUseCse } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    checkInId: z.string()
  })

  const { checkInId } = requestParamsSchema.parse(request.params)

  try {
    const validateCheckInUseCase = new PrismaValidateCheckInUseCse()

    await validateCheckInUseCase.factoryMethod().execute({
      checkInId
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof LateCheckInValidationTime) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(204).send()
}