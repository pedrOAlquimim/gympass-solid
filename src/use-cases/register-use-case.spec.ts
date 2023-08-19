import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const inMemmoryRepository = new InMemoryRepository
    const registerUseCase = new RegisterUseCase(inMemmoryRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const inMemmoryRepository = new InMemoryRepository
    const registerUseCase = new RegisterUseCase(inMemmoryRepository)

    const { user } = await registerUseCase.execute({
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
    const inMemmoryRepository = new InMemoryRepository
    const registerUseCase = new RegisterUseCase(inMemmoryRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    expect(registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})