import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym-use-case'

let inMemoryGymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(inMemoryGymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Academy',
      description: null,
      phone: null,
      latitude: -22.9305763,
      longitude: -47.0312354, 
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})