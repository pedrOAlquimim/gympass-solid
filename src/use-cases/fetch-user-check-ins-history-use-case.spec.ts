import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FecthUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history-use-case";

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: FecthUserCheckInsHistoryUseCase

describe('User History use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new FecthUserCheckInsHistoryUseCase(inMemoryCheckInRepository)
  })
  
  it('should be able to fetch history', async () => {
    await inMemoryCheckInRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    })
    
    await inMemoryCheckInRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-1'}),
      expect.objectContaining({gym_id: 'gym-2'})
    ])
  })

  it('should be able to fetch paginated history', async () => {
    for(let i = 1; i <= 22; i++) {
      await inMemoryCheckInRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${i}`
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2,
    })

    console.log(checkIns)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-21'}),
      expect.objectContaining({gym_id: 'gym-22'})
    ])
  })
})