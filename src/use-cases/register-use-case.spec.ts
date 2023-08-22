import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryRepository()
    sut = new RegisterUseCase(inMemoryRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    
    const isPasswordCorretlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('should not register with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    await expect(() => sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})