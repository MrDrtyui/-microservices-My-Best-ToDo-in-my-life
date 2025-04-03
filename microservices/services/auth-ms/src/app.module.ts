import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RedisService } from './redis/redis.service';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RedisService, EncryptionService],
})
export class AppModule {}
