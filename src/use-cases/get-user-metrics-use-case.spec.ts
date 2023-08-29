import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics-use-case";

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInRepository)
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

    const { countCheckIn } = await sut.execute({
      userId: 'user-1',
    })

    expect(countCheckIn).toBe(2)
  })
})