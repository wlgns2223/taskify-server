import { Provider } from '@nestjs/common';
import { Todo, TodoEntity } from '../todos.entity';
import { TodosRepositoryImpl } from './todos.repositoryImpl';

export interface TodosRepository {
  create: (todo: Todo) => Promise<TodoEntity>;
  findManyBy: (columnId: string) => Promise<TodoEntity[]>;
}

export const TodosRepositoryToken = Symbol('TodosRepository');

export const TodosRepositoryProvider: Provider<TodosRepository> = {
  provide: TodosRepositoryToken,
  useClass: TodosRepositoryImpl,
};
