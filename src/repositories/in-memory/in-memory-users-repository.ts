import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryRepository implements UsersRepository {
  private items: User[] =[]

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => {
      return user.email === email
    })

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string) {
    const user = this.items.find((user) => {
      return user.id === userId
    })

    if (!user) {
      return null
    }

    return user
  }
}