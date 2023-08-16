import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor (private usersRepository: any) {}

  async execute({ 
    name, 
    email, 
    password 
  }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6)
  
    const userEmailExist = await prisma.user.findUnique({
      where: {
        email,
      }
    })
  
    if (userEmailExist) {
      throw new Error('Email already exists!')
    }
  
    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}