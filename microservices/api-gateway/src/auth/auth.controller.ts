import { BadRequestException, Body, Controller, Res } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const session = await this.authService.login(loginDto);

    if (!session) {
      throw new Error('Invalild credetionals');
    }

    res.cookie('session', session, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: 'Login In' });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateDto, @Res() res: Response) {
    const session = await this.authService.register(createUserDto);

    if (!session) {
      throw new BadRequestException('Invalid credentials');
    }

    res.cookie('session', session, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: 'Login In' });
  }
}
