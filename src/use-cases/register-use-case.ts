import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor (private usersRepository: UsersRepository) {}

  async execute({ 
    name, 
    email, 
    password 
  }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6)
  
    const userEmailExist = await this.usersRepository.findByEmail(email)
  
    if (userEmailExist) {
      throw new UserAlreadyExistsError()
    }
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }
  }
}