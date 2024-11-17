import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configure, validate } from '../config';
import { CacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configure], validate }),
    CacheModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
