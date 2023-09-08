import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { PrismaCreateRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  try {
    const registerUseCase = new PrismaCreateRegisterUseCase()

    await registerUseCase.factoryMethod().execute({
      name,
      email,
      password
    })

  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }

  return reply.status(201).send()
}