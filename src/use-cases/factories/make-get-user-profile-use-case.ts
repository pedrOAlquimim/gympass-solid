import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile-use-case";

abstract class CreatorGetUserProfileUseCase {
  public abstract factoryMethod(): GetUserProfileUseCase
}

export class PrismaGetUserProfileUseCase extends CreatorGetUserProfileUseCase {
  public factoryMethod(): GetUserProfileUseCase {
    const prismaUserRepository = new PrismaUsersRepository()

    const getUserProfileUseCse = new GetUserProfileUseCase(prismaUserRepository)

    return getUserProfileUseCse
  }
}