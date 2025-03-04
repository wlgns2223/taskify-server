import { Provider } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { TodoTagServiceImpl } from './todo-tags.service';
import { Tag } from '../../tag.entity';

export interface TodoTagService {
  link: (todoId: number, tags: Tag[]) => Promise<TodoTagEntity>;
}

export const TodoTagServiceToken = Symbol('TodoTagService');

export const TodoTagServiceProvider: Provider<TodoTagService> = {
  provide: TodoTagServiceToken,
  useClass: TodoTagServiceImpl,
};
