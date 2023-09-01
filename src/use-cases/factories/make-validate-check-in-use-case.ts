import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInUseCase } from "../validate-check-in-use-case";

abstract class CreatorValidateCheckInUseCase {
  public abstract factoryMethod(): ValidateCheckInUseCase
}

export class PrismaValidateCheckInUseCse extends CreatorValidateCheckInUseCase {
  public factoryMethod(): ValidateCheckInUseCase {
    const prismaCheckInRepository = new PrismaCheckInRepository()

    const validateCheckInUseCse = new ValidateCheckInUseCase(prismaCheckInRepository)

    return validateCheckInUseCse
  }
}