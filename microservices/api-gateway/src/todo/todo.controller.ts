import { Controller, Get, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllHello(@UserId() userId: string) {
    if (!userId) {
      throw new Error('Uesr nah poshel');
    }
    return userId;
  }
}
