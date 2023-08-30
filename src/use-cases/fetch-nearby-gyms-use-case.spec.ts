import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms-use-case";

let inMemoryGymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -22.9568277,
      longitude: -47.0090684, 
    })

    await inMemoryGymRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -23.1016963,
      longitude: -47.2031966,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.9405064,
      userLongitude: -47.0096692,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' })
    ])
  })
})