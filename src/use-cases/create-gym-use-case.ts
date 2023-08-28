import { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseProps {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymUseCase {
  constructor (private gymRespository: GymsRepository) {}

  async execute({ 
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseProps) {
    const gym = await this.gymRespository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}