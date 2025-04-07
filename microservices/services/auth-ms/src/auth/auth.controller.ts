import { Body, Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDto } from './dto/createUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { MessagePattern } from '@nestjs/microservices';
import { SessionMessageDto } from 'src/dto/session.message.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login_user')
  async loginl(loginDto: LoginDto) {
    const sessionDataCrypto = await this.authService.LoginUser(loginDto);

    if (sessionDataCrypto) {
      return new SessionMessageDto(true, sessionDataCrypto);
    }

    return { message: false };
  }

  @MessagePattern('register_user')
  async register(createUserDto: CreateDto) {
    const stringSessionCrypto =
      await this.authService.CreateUser(createUserDto);

    if (stringSessionCrypto) {
      return { session: stringSessionCrypto, message: true };
    }

    return { message: false };
  }

  @MessagePattern('verify_user')
  async verify(session: string) {
    const sessionData = this.authService.DeEncryptData(session);
    const isVerify = await this.authService.VerifySession(sessionData);
    if (isVerify == true) {
      return { userId: sessionData.userId, message: true };
    }

    return { message: false };
  }

  @MessagePattern('deleteSession_user')
  async deleteSession(session: string) {
    const sessionData = this.authService.DeEncryptData(session);
    const result = await this.authService.DeleteSession(sessionData);
    if (result) {
      return { message: true };
    }
    return { message: false };
  }

  @Get('beach')
  async verifyRest(@Req() req: Request) {
    const session = req.headers.cookie;
    const sessionData = this.authService.DeEncryptData(session);
    const isVerify = await this.authService.VerifySession(sessionData);
    if (isVerify == true) {
      return { userId: sessionData.userId, message: true };
    }

    return { message: false };
  }
}
