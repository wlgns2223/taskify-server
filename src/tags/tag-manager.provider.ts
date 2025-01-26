import { Provider } from '@nestjs/common';
import { TagManagerServiceImpl } from './tag-manager.service';
import { TodoTag, TodoTagEntity } from './todo-tags/todo-tags.entity';
import { TagEntity } from './tag.entity';

export interface TagManagerService {
  createTagAndLinkToTodo: (todoId: number, tag: string) => Promise<{ tag: TagEntity; todoTag: TodoTagEntity }>;
}

export const TagManagerServiceToken = Symbol('TagManagerService');

export const TagManagerServiceProvider: Provider<TagManagerService> = {
  provide: TagManagerServiceToken,
  useClass: TagManagerServiceImpl,
};
