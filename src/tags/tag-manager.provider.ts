import { Provider } from '@nestjs/common';
import { TagManagerServiceImpl } from './tag-manager.service';
import { Tag } from './tag.model';
import { TodoTag } from './todo-tags/todo-tags.model';

export interface TagManagerService {
  createTagAndLinkToTodo: (todoId: number, tag: string) => Promise<{ tag: Tag; todoTag: TodoTag }>;
}

export const TagManagerServiceToken = Symbol('TagManagerService');

export const TagManagerServiceProvider: Provider<TagManagerService> = {
  provide: TagManagerServiceToken,
  useClass: TagManagerServiceImpl,
};
