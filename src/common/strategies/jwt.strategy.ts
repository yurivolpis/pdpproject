import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfig, IJwtConfig } from '../../config/interfaces';
import { IAccessTokenPayload } from '../../modules/auth/interfaces';
import { CacheService } from '../../modules/cache/services';
import { UserService } from '../../modules/user/services';
import { EStrategyName } from '../enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, EStrategyName.JWT) {
  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {
    const jwtConfig = configService.get<IJwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: IAccessTokenPayload): Promise<User> {
    const cachedToken = await this.cacheService.getCache(payload.sub + '');
    if (!cachedToken) {
      throw new UnauthorizedException(
        'Token has been expired in the redis side',
      );
    }

    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
