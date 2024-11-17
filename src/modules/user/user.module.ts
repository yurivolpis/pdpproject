import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
