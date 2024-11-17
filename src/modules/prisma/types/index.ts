import { Prisma } from '@prisma/client';

export type UserManyArgs =
  | Prisma.UserCreateManyArgs
  | Prisma.UserUpdateManyArgs;

export type UserArgs =
  | Prisma.UserCreateArgs
  | Prisma.UserUpdateArgs
  | Prisma.UserUpsertArgs;

export type UserInput = Prisma.UserCreateInput | Prisma.UserUpdateInput;
