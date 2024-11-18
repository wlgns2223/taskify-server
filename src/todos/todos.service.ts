import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  constructor(private todosRepository: TodosRepository) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    const newTodo = new Todo({
      ...createTodoDto,
    });
    return await this.todosRepository.createTodo(newTodo);
  }

  async getTodosByColumnId(columnId: string) {
    return await this.todosRepository.getTodosByColumnId(columnId);
  }
}
