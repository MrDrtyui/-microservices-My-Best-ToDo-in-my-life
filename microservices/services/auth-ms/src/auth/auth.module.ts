import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RedisService, PrismaService, EncryptionService],
})
export class AuthModule {}
