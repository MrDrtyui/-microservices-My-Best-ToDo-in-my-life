import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDto } from './dto/createUser.dto';
import { Response, Request } from 'express';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const sessionData = await this.authService.LoginUser(loginDto);

    if (sessionData) {
      res.cookie('session', sessionData, {
        httpOnly: true,
        secure: true,
      });

      return res.status(200).json({ message: 'Loggin in' });
    }
  }

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
  async verify(@Req() req: Request, @Res() res: Response) {
    const session = req.cookies.session;
    const sessionData = this.authService.DeEncryptData(session);
    const isVerify = await this.authService.VerifySession(sessionData);
    if (isVerify) {
      return res.status(200).json({ verify: true, userId: sessionData.userId });
    }
    return res.status(401).json({ verify: false });
  }

  @Delete()
  async deleteSession(@Req() req: Request, @Res() res: Response) {
    const session = req.cookies.session;
    const sessionData = this.authService.DeEncryptData(session);
    const result = await this.authService.DeleteSession(sessionData);
    return res.status(200).json({ message: result });
  }
}
