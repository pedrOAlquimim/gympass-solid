import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUseCase } from "@/use-cases/register-use-case"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      email,
      password
    })

  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}