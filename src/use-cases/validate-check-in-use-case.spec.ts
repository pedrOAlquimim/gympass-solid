import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationTime } from "./errors/late-check-in-validation-time-error";

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  
  it('should be able to validate the check in', async () => {
    const createdCheckIn = await inMemoryCheckInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1'
    })

    await sut.execute({
      checkInId: createdCheckIn.id
    }) 

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should no be able to validate the check in with wrong id', async () => {
    await expect(() => sut.execute({
      checkInId: 'invalid-checkIn-Id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check in after a while', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 13, 40))

    const createdCheckIn = await inMemoryCheckInRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1'
    })

    const twentyOneMinutes = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutes)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationTime)
  })
})