import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateTodoDto } from './dto/createTodo.dto';

@Injectable()
export class TodoService {
  @Client({
    transport: Transport.TCP,
    options: {
      port: 3014,
      host: 'localhost',
    },
  })
  private readonly client: ClientProxy;

  async createTodo(createUserDto: CreateTodoDto) {
    try {
      const response = await this.client
        .send('todo-create', createUserDto)
        .toPromise();
      return response;
    } catch {
      return null;
    }
  }
}
