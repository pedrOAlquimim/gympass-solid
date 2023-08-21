import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InMemoryRepository } from "@/repositories/in-memory/in-memory-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/invalid-credential-error";

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shoud not be able to authenticate with wrong email', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    }) 

    await expect(() => sut.execute({
      email: 'johndoeWrong@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    }) 

    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialError)})
})