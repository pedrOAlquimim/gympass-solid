import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";

abstract class CreatorAuthenticateUseCase {
  protected abstract factoryMethod(): AuthenticateUseCase
}

export class PrismaAuthenticateUseCase extends CreatorAuthenticateUseCase {
  public factoryMethod(): AuthenticateUseCase {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
  }
}