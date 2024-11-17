import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setCache(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.set(key, value, 'EX', ttl);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async getCache(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteCache(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(key)) !== 0;
  }
}
