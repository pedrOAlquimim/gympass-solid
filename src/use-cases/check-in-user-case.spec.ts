import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in-use-case";

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check In use Case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(inMemoryCheckInRepository)
  })
  
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})