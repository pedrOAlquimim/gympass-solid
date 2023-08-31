import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = []
  
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }
    
    this.items.push(checkIn)
    
    return checkIn
  }
  
  async findUserByIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at, 'date')

      const isOnSameDate = dayjs(date).isSame(checkInDate, 'date')
      
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1 ) * 20, page * 20)
  }

  async countCheckInsByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const existentCheckInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (existentCheckInIndex >= 0) {
      this.items[existentCheckInIndex] = checkIn
    }
    
    return checkIn
  }
}