import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error";
import { PrismaAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateUseCase = new PrismaAuthenticateUseCase()

    const { user } = await authenticateUseCase.factoryMethod().execute({
      email,
      password
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })
    
    return reply.status(200).send({token})
  
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
