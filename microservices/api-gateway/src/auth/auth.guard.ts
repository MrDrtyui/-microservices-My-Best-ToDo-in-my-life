import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { debuglog } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const cookie = req.headers.cookie;

    if (!cookie) {
      throw new UnauthorizedException('Huy tam');
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.post('http://localhost:3000/auth/verify', null, {
          headers: {
            Cookie: cookie,
          },
        }),
      );

      if (data.verify === true) {
        req['user'] = {
          userId: data.userId,
        };
        return true;
      }

      return false;
    } catch (e) {
      debuglog(e);
      throw new UnauthorizedException('Huy tam');
    }
  }
}
