import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in-use-case";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";

abstract class CreatorCheckInUseCase {
  public abstract factoryMethod(): CheckInUseCase
}

export class PrismaCheckInUseCase extends CreatorCheckInUseCase {
  public factoryMethod(): CheckInUseCase {
    const prismaGymRepository = new PrismaGymsRepository()
    const prismaCheckInRepository = new PrismaCheckInRepository()

    const checkInUseCase = new CheckInUseCase(prismaCheckInRepository, prismaGymRepository)

    return checkInUseCase
  }
}