import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async userInDb(userId: string): Promise<string> {
    try {
      const user = await this.prisma.userWithTodo.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!user) {
        const newUser = await this.prisma.userWithTodo.create({
          data: { userId: userId },
        });
        return newUser.userId;
      }

      return user.userId;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
