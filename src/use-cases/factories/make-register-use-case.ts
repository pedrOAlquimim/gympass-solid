import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register-use-case";

abstract class CreatorRegisterUseCase {
  public abstract factoryMethod(): RegisterUseCase
}

export class PrismaCreateRegisterUseCase extends CreatorRegisterUseCase {
  public factoryMethod(): RegisterUseCase {
    const usersRepository = new PrismaUsersRepository()
    
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
  }
  
}