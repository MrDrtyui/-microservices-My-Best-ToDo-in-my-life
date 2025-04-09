import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PrismaService, UserService],
})
export class AppModule {}
