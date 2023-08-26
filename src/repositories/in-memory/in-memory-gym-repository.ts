import { CheckIn, Gym, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []
  
  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}