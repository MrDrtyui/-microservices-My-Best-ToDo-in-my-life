import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { CreateSessionDto } from './dto/sessionCreate.dto';
import { SessionDto } from './dto/session.dto';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: 8001,
      password: process.env.REDIS_PASSWORD,
    });
  }

  async CreateSession(createSession: CreateSessionDto) {
    const sessionId = uuidv4();
    await this.redis.hset(
      `session:${createSession.userId}`,
      sessionId,
      'valid',
    );
    await this.redis.expire(
      `session;${createSession.userId}`,
      Number(process.env.REDIS_SESSION_EXPIRE),
    );

    const sessionDate: SessionDto = {
      userId: createSession.userId,
      sessionId: sessionId,
    };

    return sessionDate;
  }

  async VerifySession(sessionData: SessionDto) {
    const result = await this.redis.hexists(
      `session:${sessionData.userId}`,
      sessionData.sessionId,
    );
    return result === 1;
  }

  async DeleteSession(userId: string) {
    await this.redis.del(`session:${userId}`);
  }
}
