import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IConfig, IJwtConfig } from '../../../config/interfaces';
import { CacheService } from '../../cache/services';
import { MailerService } from '../../mailer/services';
import { CreateUserDto } from '../../user/dtos';
import { UserService } from '../../user/services';
import { ResetPasswordDto, SignInDto } from '../dtos';
import { IAccessToken, IAccessTokenPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService<IConfig>,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IAccessToken> {
    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      ...rest,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async signIn(signInDto: SignInDto): Promise<IAccessToken> {
    const { email, password } = signInDto;

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `User with email ${signInDto.email} is not found`,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<IAccessToken> {
    const payload: IAccessTokenPayload = {
      sub: user.id,
      username: user.username,
    };
    const jwtConfig = this.configService.get<IJwtConfig>('jwt');

    const isAccessTokenCached = await this.cacheService.exists(user.id + '');

    let accessToken;

    if (isAccessTokenCached) {
      accessToken = await this.cacheService.getCache(user.id + '');

      return { accessToken };
    }

    accessToken = this.jwtService.sign(payload);
    await this.cacheService.setCache(
      user.id + '',
      accessToken,
      jwtConfig.expiresIn,
    );

    return {
      accessToken,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    await this.mailerService.sendResetPasswordLink(email);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const email = await this.mailerService.verifyResetPasswordToken(
      resetPasswordDto.token,
    );

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} is not found`);
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    await this.userService.updateUserById(user.id, {
      password: hashedPassword,
    });
  }
}
