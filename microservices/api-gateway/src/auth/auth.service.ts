import { Injectable } from '@nestjs/common';
import { SessionMessageDto } from 'src/dto/session.message.dto';
import { LoginDto } from './dto/login.dto';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateDto } from './dto/createUser.dto';
import { debuglog } from 'node:util';

@Injectable()
export class AuthService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3000,
    },
  })
  private readonly client: ClientProxy;

  async login(loginDto: LoginDto) {
    try {
      const response = await this.client
        .send('login_user', loginDto)
        .toPromise();

      const sessionMessage = new SessionMessageDto(
        response.message,
        response.session,
      );
      if (sessionMessage.IsValid()) {
        return sessionMessage.session;
      }
      return null;
    } catch (e) {
      debuglog(e);
      return null;
    }
  }

  async register(createUserDto: CreateDto) {
    try {
      const response = await this.client
        .send('register_user', createUserDto)
        .toPromise();

      const sessionMessage = new SessionMessageDto(
        response.message,
        response.session,
      );

      if (sessionMessage.IsValid()) {
        return sessionMessage.session;
      }

      return null;
    } catch (e) {
      debuglog(e);
      return null;
    }
  }
}
