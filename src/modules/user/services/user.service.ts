import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username);
  }

  async getuserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  async createUser(user: Prisma.UserCreateInput) {
    return this.userRepository.createUser(user);
  }
}
