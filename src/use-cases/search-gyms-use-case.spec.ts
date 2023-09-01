import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FecthUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGymsUseCase } from "./search-gyms-use-case";
import { Prisma } from "@prisma/client";

let inMemoryGymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search Gyms use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })
  
  it('should be able get a gym', async () => {
    await inMemoryGymsRepository.create({
      description: '',
      title: 'JS Academy',
      phone: '',
      latitude: new Prisma.Decimal(-22.9305763),
      longitude: new Prisma.Decimal(-47.0312354), 
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Academy' })])
  })

  it('should be able to fetch paginated gyms', async () => {
    for(let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        description: '',
        title: `JS Academy ${i}`,
        phone: '',
        latitude: new Prisma.Decimal(-22.9305763),
        longitude: new Prisma.Decimal(-47.0312354), 
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'JS Academy 21'}),
      expect.objectContaining({title: 'JS Academy 22'})
    ])
  })
})