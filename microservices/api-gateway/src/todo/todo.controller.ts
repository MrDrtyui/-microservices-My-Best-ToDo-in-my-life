import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/common/decorators/current-user.decorator';
import { CreateTodoDto } from './dto/createTodo.dto';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(
    @UserId() userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    if (!userId) {
      throw new Error('Uesr nah poshel');
    }

    createTodoDto.userId = userId;

    const todo = await this.todoService.createTodo(createTodoDto);

    if (!todo) {
      throw new BadRequestException('hahah loh ');
    }

    return todo;
  }
}
