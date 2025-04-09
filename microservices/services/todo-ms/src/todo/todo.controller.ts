import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @MessagePattern('todo-create')
  create(createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @MessagePattern('findAllTodo')
  findAll() {
    return this.todoService.findAll();
  }

  @MessagePattern('findOneTodo')
  findOne(@Payload() id: number) {
    return this.todoService.findOne(id);
  }

  @MessagePattern('updateTodo')
  update(@Payload() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(updateTodoDto.id, updateTodoDto);
  }

  @MessagePattern('removeTodo')
  remove(@Payload() id: number) {
    return this.todoService.remove(id);
  }
}
