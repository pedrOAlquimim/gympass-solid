import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  findUserByIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  countCheckInsByUserId: (userId: string) => Promise<number>
  findById: (checkInId: string) => Promise<CheckIn | null>
  save: (checkIn: CheckIn) => Promise<CheckIn>
}