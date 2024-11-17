import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dtos';
import { ResetPasswordDto, SignInDto } from './dtos';
import { IAccessToken } from './interfaces';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<IAccessToken> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<IAccessToken> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.forgotPassword(email);

    return { message: 'Password reset email sent successfully' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
