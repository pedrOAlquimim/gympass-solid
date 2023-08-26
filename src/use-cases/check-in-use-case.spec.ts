import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in-use-case";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Prisma } from "@prisma/client";

let inMemoryCheckInRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Check In use Case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymRepository)

    inMemoryGymRepository.items.push({
      id: 'gym-01',
      description: '',
      title: 'JS Academy',
      phone: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0), 
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 5, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to ckeck in in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 5, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 10, 0, 0))

    
    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    inMemoryGymRepository.items.push({
      id: 'gym-02',
      description: '',
      title: 'JS Academy 2',
      phone: '',
      latitude: new Prisma.Decimal(-22.9305763),
      longitude: new Prisma.Decimal(-47.0312354), 
    })

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -22.9405064,
      userLongitude: -47.0096692,
    })).rejects.toBeInstanceOf(Error)
  })
})