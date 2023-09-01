import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym-use-case";

abstract class CreatorCreateGymUseCase {
  public abstract factoryMethod(): CreateGymUseCase
}

export class PrismaCreateGymUseCase extends CreatorCreateGymUseCase {
  public factoryMethod(): CreateGymUseCase {
    const prismaGymRepository = new PrismaGymsRepository()

    const createGymUseCase = new CreateGymUseCase(prismaGymRepository)

    return createGymUseCase
  }
}