import { GetUserMetricsUseCase } from "../get-user-metrics-use-case";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";

abstract class CreatorGetUserMetricsUseCase {
  public abstract factoryMethod(): GetUserMetricsUseCase
}

export class PrismaGetUserMetricsUseCase extends CreatorGetUserMetricsUseCase {
  public factoryMethod(): GetUserMetricsUseCase {
    const prismaUserRepository = new PrismaCheckInRepository()

    const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaUserRepository)

    return getUserMetricsUseCase
  }
}