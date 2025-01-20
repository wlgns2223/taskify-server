import { Provider } from '@nestjs/common';
import { TodoTag } from '../todo-tags.model';
import { TodoTagServiceImpl } from './todo-tags.service';

export interface TodoTagService {
  link: (todoId: number, tagId: number) => Promise<TodoTag>;
}

export const TodoTagServiceToken = Symbol('TodoTagService');

export const TodoTagServiceProvider: Provider<TodoTagService> = {
  provide: TodoTagServiceToken,
  useClass: TodoTagServiceImpl,
};
