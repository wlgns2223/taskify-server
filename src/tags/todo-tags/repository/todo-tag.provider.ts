import { Provider } from '@nestjs/common';
import { TodoTag } from '../todo-tags.model';
import { TodoTagRepositoryImpl } from './todo-tags.repository';

export interface TodoTagRepository {
  create: (todoTag: TodoTag) => Promise<TodoTag>;
  find: (todoId: number, tagId: number) => Promise<TodoTag | null>;
}

export const TodoTagRepositoryToken = Symbol('TodoTagRepository');

export const TodoTagRepositoryProvider: Provider<TodoTagRepository> = {
  provide: TodoTagRepositoryToken,
  useClass: TodoTagRepositoryImpl,
};
