import { Provider } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { TodoTagRepositoryImpl } from './todo-tags.repositoryImpl';

export interface TodoTagRepository {
  create: (todoTag: TodoTag) => Promise<TodoTagEntity>;
  findOneBy: (todoId: number, tagId: number) => Promise<TodoTagEntity | null>;
}

export const TodoTagRepositoryToken = Symbol('TodoTagRepository');

export const TodoTagRepositoryProvider: Provider<TodoTagRepository> = {
  provide: TodoTagRepositoryToken,
  useClass: TodoTagRepositoryImpl,
};
