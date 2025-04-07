import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule],
  controllers: [TodoController],
  providers: [TodoService, AuthService],
})
export class TodoModule {}
