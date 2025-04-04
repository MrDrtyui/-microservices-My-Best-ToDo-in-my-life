import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { CreateSessionDto } from 'src/redis/dto/sessionCreate.dto';
import { SessionDto } from 'src/redis/dto/session.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { LoginDto } from './dto/loginUser.dto';
import { debuglog } from 'util';

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly crypto: EncryptionService,
  ) {}

  async CreateUser(createDto: CreateDto): Promise<string> {
    try {
      const userExis = await this.prisma.user.findUnique({
        where: {
          email: createDto.email,
        },
      });

      if (userExis) {
        throw new BadRequestException('Пользователь уже существует');
      }

      const hashedPassword = await bcrypt.hash(createDto.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          email: createDto.email,
          password: hashedPassword,
        },
      });

      const sessionUserId: CreateSessionDto = {
        userId: newUser.id,
      };

      const sessionData = await this.redis.CreateSession(sessionUserId);

      const encryptedData = this.crypto.encryptData(
        JSON.stringify(sessionData),
      );

      return encryptedData;
    } catch (e) {
      debuglog(e);
      throw new BadRequestException({ message: 'Errorka' });
    }
  }

  async LoginUser(loginDto: LoginDto): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
      });

      const isMath = await bcrypt.compare(loginDto.password, user.password);

      if (!isMath) {
        throw new BadRequestException({ message: 'Неверный логин или пароль' });
      }

      const sessionUserId: CreateSessionDto = {
        userId: user.id,
      };

      const sessionData = await this.redis.CreateSession(sessionUserId);

      const encryptData = this.crypto.encryptData(JSON.stringify(sessionData));

      return encryptData;
    } catch (e) {
      debuglog(e);
      throw new BadRequestException({ message: 'Errorka' });
    }
  }

  DeEncryptData(shiphString: string): SessionDto {
    const deEncrypt = this.crypto.decryptData(shiphString);
    const objSession = JSON.parse(deEncrypt);
    return new SessionDto(objSession.userId, objSession.sessionId);
  }

  async VerifySession(sessionData: SessionDto) {
    return await this.redis.VerifySession(sessionData);
  }

  async DeleteSession(sessionData: SessionDto) {
    return await this.redis.DeleteSession(sessionData.userId);
  }
}
