import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDto } from './dto/createUser.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateDto, @Res() res: Response) {
    const stringSessionCrypto =
      await this.authService.CreateUser(createUserDto);

    if (stringSessionCrypto) {
      res.cookie('session', stringSessionCrypto, {
        httpOnly: true,
        secure: true,
      });

      return res.status(200).json({ message: 'Loggin in' });
    }
  }

  @Post('verify')
  async verify(@Req() req: Request) {
    const session = req.cookies.session;
    const sessionData = this.authService.DeEncryptData(session);
    return this.authService.VerifySession(sessionData);
  }
}
