import { Gym, Prisma } from "@prisma/client";
import { FindManyNearby, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinatesInKm } from "@/utils/get-distance-in-km-between-coordinates";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }

    this.items.push(gym)

    return gym
  }
  
  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice(( page - 1 ) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearby) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinatesInKm(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
      )

      return distance < 10
    })
  }
}