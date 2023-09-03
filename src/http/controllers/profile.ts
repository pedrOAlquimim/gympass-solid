import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { PrismaGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = new PrismaGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.factoryMethod().execute({
      userId: request.user.sub
    })

    return reply.status(200).send({
      ...user,
      password_hash: undefined     
    })
  }
  catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({message: error.message})
    }

    throw error
  }
}