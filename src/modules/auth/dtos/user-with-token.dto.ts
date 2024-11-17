import { User } from '@prisma/client';
import { UserDto } from '../../user/dtos';
import { IUserDto } from '../../user/interfaces';
import { IAccessToken } from '../interfaces';

export class UserWithTokenDto implements IAccessToken {
  accessToken: string;
  user: IUserDto;

  static fromUserAndToken(user: User, token: IAccessToken): UserWithTokenDto {
    const userWithTokenDto = new UserWithTokenDto();

    userWithTokenDto.accessToken = token.accessToken;
    userWithTokenDto.user = UserDto.fromUser(user);

    return userWithTokenDto;
  }
}
