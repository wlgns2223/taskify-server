import { Provider } from '@nestjs/common';
import { PlainOf } from '../../common/types';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { Todo, TodoEntity } from '../todos.entity';
import { TodosServiceImpl } from './todos.serviceImpl';

export interface TodosService {
  create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File): Promise<TodoEntity>;
  findManyBy(columnId: string): Promise<TodoEntity[]>;
}

export const TodoServiceToken = Symbol('TodoService');

export const TodoServiceProvider: Provider<TodosService> = {
  provide: TodoServiceToken,
  useClass: TodosServiceImpl,
};
