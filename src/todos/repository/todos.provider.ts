import { Provider } from '@nestjs/common';
import { Todo } from '../todos.model';
import { TodosRepositoryImpl } from './todos.repository';

export interface TodosRepository {
  create: (todo: Todo) => Promise<Todo>;
  findManyBy: (columnId: string) => Promise<Todo[]>;
}

export const TodosRepositoryToken = Symbol('TodosRepository');

export const TodosRepositoryProvider: Provider<TodosRepository> = {
  provide: TodosRepositoryToken,
  useClass: TodosRepositoryImpl,
};
