import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, TodoModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, HttpModule],
})
export class AppModule {}
