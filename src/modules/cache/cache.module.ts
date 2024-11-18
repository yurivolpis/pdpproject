import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { IRedisConfig } from '../../config/interfaces';
import { CacheService } from './services/cache.service';

export const redisService: Provider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisConfig = configService.get<IRedisConfig>('redis');

    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      connectTimeout: 1000,
    });
  },
};

@Global()
@Module({
  imports: [],
  providers: [CacheService, redisService],
})
export class CacheModule {}
