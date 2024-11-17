import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  private userModel: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.userModel = prismaService.user;
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findUniqueOrThrow({
      where: { id },
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findFirstOrThrow({ where: { username } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findUniqueOrThrow({ where: { email } });
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.userModel.create({ data: user });
  }

  async upsertUserByid(
    id: number,
    createUserDto: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userModel.upsert({
      where: { id },
      create: {
        ...createUserDto,
        username: createUserDto.username ?? '',
      },
      update: {
        ...createUserDto,
      },
    });
  }
}
