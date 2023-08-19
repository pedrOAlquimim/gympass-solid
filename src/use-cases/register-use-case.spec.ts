import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  it('should hash password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }
      },

      async findByEmail(email) {
        return null
      },
    })

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
})