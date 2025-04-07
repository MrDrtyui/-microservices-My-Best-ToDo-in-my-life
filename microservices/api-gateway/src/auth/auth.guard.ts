import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { debuglog } from 'node:util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const session = req.cookies?.session;

    if (!session) {
      throw new UnauthorizedException('Cookie not found');
    }

    try {
      const userId = await this.authService.verify(session);

      if (userId) {
        (req as any).userId = userId;
        return true;
      }
    } catch (error) {
      debuglog(error);
      throw new UnauthorizedException('Invalid token');
    }

    return false;
  }
}
