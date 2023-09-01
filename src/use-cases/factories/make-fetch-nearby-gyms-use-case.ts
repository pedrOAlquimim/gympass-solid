import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms-use-case";

abstract class CreatorFetchNearbyGymsUseCase {
  public abstract factoryMethod(): FetchNearbyGymsUseCase
}

export class PrismaFetchNearbyGymsUseCase extends CreatorFetchNearbyGymsUseCase {
  public factoryMethod(): FetchNearbyGymsUseCase {
    const prismaFetchNearbyGymsUseCase = new PrismaGymsRepository()

    const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(prismaFetchNearbyGymsUseCase)

    return fetchNearbyGymsUseCase
  }
}