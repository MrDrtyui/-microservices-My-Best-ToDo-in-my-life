import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const userId = await this.user.userInDb(createTodoDto.userId);

      if (!userId) {
        throw new Error('Hui na epta ahhaahahahah');
      }

      const todo = await this.prisma.todo.create({
        data: {
          title: createTodoDto.title,
          description: createTodoDto.description,
          userId: userId,
        },
      });

      return todo;
    } catch (e) {
      return e;
    }
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
