import { InMemoryRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile-use-case";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryRepository: InMemoryRepository
let sut: GetUserProfileUseCase

describe('Get user use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryRepository()
    sut = new GetUserProfileUseCase(inMemoryRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual(expect.any(String))
  })

  it('should not get user', async () => {
    expect(() => sut.execute({
      userId: 'wrong-user-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})