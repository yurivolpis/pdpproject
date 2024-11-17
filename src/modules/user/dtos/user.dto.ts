import { User } from '@prisma/client';
import { IUserDto } from '../interfaces';

export class UserDto implements IUserDto {
  id: number;
  email: string;
  username: string;

  static fromUser(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.email = user.email;
    userDto.username = user.username;

    return userDto;
  }
}
