import { Provider } from '@nestjs/common';
import { Serialized } from '../../common/types';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { Todo } from '../todos.model';
import { TodosServiceImpl } from '../todos.service';

export interface TodosService {
  create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File): Promise<Serialized<Todo>>;
  findManyBy(columnId: string): Promise<Serialized<Todo>[]>;
}

export const TodoServiceToken = Symbol('TodoService');

export const TodoServiceProvider: Provider<TodosService> = {
  provide: TodoServiceToken,
  useClass: TodosServiceImpl,
};
