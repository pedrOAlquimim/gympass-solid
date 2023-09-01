import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms-use-case";

abstract class CreatorSearchGymsUseCase {
  public abstract factoryMethod(): SearchGymsUseCase
}

export class PrismaSearchGymsUseCase extends CreatorSearchGymsUseCase {
  public factoryMethod(): SearchGymsUseCase {
    const prismaGymRepository = new PrismaGymsRepository()

    const searchGymsUseCase = new SearchGymsUseCase(prismaGymRepository)

    return searchGymsUseCase
  }
}