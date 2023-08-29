import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"

interface FecthUserCheckInsHistoricUseCaseRequest {
  userId: string,
  page: number
}

interface FecthUserCheckInsHistoricUseCaseResponse {
  checkIns: CheckIn[]
}

export class FecthUserCheckInsHistoricUseCase {
  constructor (private checkInsRepository: CheckInsRepository) {}

  async execute({ 
    userId,
    page
  }: FecthUserCheckInsHistoricUseCaseRequest): Promise<FecthUserCheckInsHistoricUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}