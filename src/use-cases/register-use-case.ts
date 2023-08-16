import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ 
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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    }
  })
}