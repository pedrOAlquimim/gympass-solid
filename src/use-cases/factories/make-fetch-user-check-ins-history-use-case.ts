import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { FecthUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history-use-case";

abstract class CreatorFetchUserCheckInsHistoryUseCase {
  public abstract factoryMethod(): FecthUserCheckInsHistoryUseCase
}

export class PrismaFecthUserCheckInsHistoryUseCase extends CreatorFetchUserCheckInsHistoryUseCase {
  public factoryMethod(): FecthUserCheckInsHistoryUseCase {
    const prismaCheckInRepository = new PrismaCheckInRepository()
    
    const fecthUserCheckInsHistoryUseCase = new FecthUserCheckInsHistoryUseCase(prismaCheckInRepository)

    return fecthUserCheckInsHistoryUseCase
  }
}