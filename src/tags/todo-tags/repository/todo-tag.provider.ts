import { Provider } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { TodoTagRepositoryImpl } from './todo-tags.repositoryImpl';
import { Tag } from '../../tag.entity';

export interface TodoTagRepository {
  create: (todoId: number, todoTag: Tag[]) => Promise<void>;
  findOneBy: (todoId: number, tagId: number) => Promise<TodoTagEntity | null>;
}

export const TodoTagRepositoryToken = Symbol('TodoTagRepository');

export const TodoTagRepositoryProvider: Provider<TodoTagRepository> = {
  provide: TodoTagRepositoryToken,
  useClass: TodoTagRepositoryImpl,
};
