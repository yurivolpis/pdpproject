import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { IConfig, IJwtConfig } from '../../config/interfaces';
import { CacheModule, redisService } from '../cache/cache.module';
import { CacheService } from '../cache/services';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../user/repositories';
import { UserService } from '../user/services';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services';

@Module({
  imports: [
    PassportModule,
    UserModule,
    CacheModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService<IConfig>) {
        const jwtConfig = configService.get<IJwtConfig>('jwt');

        return {
          signOptions: { expiresIn: jwtConfig.expiresIn },
          secret: jwtConfig.secret,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    CacheService,
    redisService,
    JwtStrategy,
  ],
})
export class AuthModule {}
